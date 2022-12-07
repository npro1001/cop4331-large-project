const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Post = require('../models/postModel')
const Anthem = require('../models/anthemModel')
const sendMail = require('../utils/sendMail')
const userModel = require('../models/userModel')
const anthemModel = require('../models/anthemModel')
const multer = require('multer')
var mongoose = require('mongoose');
const fs = require('fs');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink);
var path = require('path');
const dotenv = require('dotenv').config();
const sharp = require('sharp');
const e = require('express')
const { ErrorMessage } = require('formik')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body

  if (!name || !email || !username || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const emailExists = await User.findOne({ email: { $regex: new RegExp("^" + email + "$", "i") } })
  const usernameExists = await User.findOne({ username: { $regex: new RegExp("^" + username + "$", "i") } })

  if (emailExists && usernameExists) {
    res.status(400)
    throw new Error('Username and email already exist')
  }
  else if (emailExists) {
    res.status(400)
    throw new Error('Email already in use')
  }
  else if (usernameExists) {
    res.status(400)
    throw new Error('Username already in use')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    username,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      isConfirmed: user.isConfirmed,
      about: user.about,
      followers: user.followers,
      following: user.following,
      token: generateToken(user._id),
      anthem: {}
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!(username && password)) {
    throw new Error("All input required");
  }

  // Check for username
  const user = await User.findOne({ username })

  // TO DO: Add && user.isConfirmed
  if (user && (await bcrypt.compare(password, user.password))) {

    // Ensure the account has been verified
    if (!user.isConfirmed) {
      res.status(403).json({ message: "Verify your account" })
    }
    else {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
        isConfirmed: user.isConfirmed,
        about: user.about,
        followers: user.followers,
        following: user.following,
        anthem: user.anthem,
        profilePicture: user.profilePicture,
        posts: user.posts,
        topArtist: user.topArtist
      })
    }

  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get logged in user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)


  res.status(200).json(user)
})


// @desc    Update user
// @route   PUT /api/user/update
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  //const user = await User.findById(req.user.id)
  const user = await User.findById(req.user.id)

  // All possible updateable user fields from frontend currently
  const { name, username, anthemId, anthemTitle, anthemArtist1, anthemImage, anthemUrl } = req.body;

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  if (anthemId) {
    // Create anthem
    const newAnthem = await Anthem.create({
      user: user,
      id: anthemId,
      title: anthemTitle,
      artist1: anthemArtist1,
      image: anthemImage,
      url: anthemUrl
    })
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { name: name, username: username, anthem: newAnthem }, {
      new: true,
    })
  } else {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { name: name, username: username }, {
      new: true,
    })
  }


  //! Remove password update for now
  // if(user.password != req.body.password){
  //   const salt = await bcrypt.genSalt(10);
  //   req.body.password = await bcrypt.hash(req.body.password, salt)
  // }


  const updatedUser = await User.findByIdAndUpdate(req.user.id, { name: name, username: username, anthem: newAnthem }, {
    new: true,
  })

  res.status(200).json(updatedUser)
})


// @desc    Upload a Profile Picture
// @route   POST /api/users/uploadProfilePic
// @access  Public
const uploadProfilePic = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a file');
  }

  const { id } = req.body
  var user = await User.findById(id)
  var imgPath = __dirname + '/../middleware/temp/';
  await sharp(imgPath + req.file.filename).resize(150, 150)
    .rotate()
    .png({ quality: 100 }).toFile(imgPath + req.file.filename + '-thumb');

  var img = fs.readFileSync(path.join(imgPath + req.file.filename + '-thumb'));

  if (!user || !img) {
    res.status(400);
    throw new Error('Image did not successfully upload');
  }

  // var encode_img = img.toString('base64');

  var final_img = {
    contentType: req.file.mimetype,
    data: img
  };

  await user.updateOne({ profilePicture: final_img });

  if (user.profilePicture) {
    res.status(201).json({
      _id: user.id,
      profilePicture: user.profilePicture,
    })
    await unlinkAsync(imgPath + req.file.filename);
    await unlinkAsync(imgPath + req.file.filename + '-thumb');
  } else {
    res.status(400);
    throw new Error('Error uploading profile picture');
  }
});


// Follow a User
const followUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      console.log("SHIT")
      const followUser = await User.findById(mongoose.Types.ObjectId(id));
      const followingUser = await User.findById(mongoose.Types.ObjectId(currentUserId));

      console.log("checking if user doesn't already follow the target user")
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });

        res.status(200).json(followingUser.following);
      } else {
        console.log("poooooooo already follows")
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      console.log("errrror")
      res.status(500).json(error);
    }
  }
};


// UnFollow a User
const unfollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await User.findById(mongoose.Types.ObjectId(id));
      const followingUser = await User.findById(mongoose.Types.ObjectId(currentUserId));

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });

        res.status(200).json(followingUser.following);
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


// @desc send a mail with the link to verify mail
// @route POST /api/users/confirm
// @access PUBLIC
const mailForEmailVerification = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email })

    if (user) {
      // send a verification email, if this user is not a confirmed email
      if (!user.isConfirmed) {
        // send the mail
        await sendMail(user._id, email, 'email verification')
        res.status(201).json({
          message: `Sent a verification email to ${email}`
        });
      } else {
        res.status(400)
        throw new Error('User already confirmed')
      }
    }
  } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error('Could not send the mail. Please retry.')
  }
});

// @desc verify users account via email
// @route GET /api/users/verify/:token
// @access PUBLIC
const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params

  // Check for token
  if (!token) {
    return res.status(422).json({ message: "Missing verification token" })
  }

  // Verify token from the URL
  let payload = null
  try {
    payload = jwt.verify(
      token,
      process.env.JWT_EMAIL_TOKEN_SECRET
    );
  } catch (err) {
    return res.status(500).send(err)
  }

  try {
    // Find user with matching id
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(payload.id) }).exec()
    if (!user) {
      return res.status(404).send({ message: "User does not exist" })
    }

    // If user found from token, verify them
    user.isConfirmed = true
    await user.save()

    // return res.status(200).json({mesagge: "Account verified"})
    return res.status(200).redirect(process.env.FRONTEND_BASE_URL)

  } catch (error) {
    return res.status(500).send(err)
  }

})



// @desc send a mail with the link to reset password
// @route POST /api/users/resetEmail
// @access PUBLIC
const mailForResetPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      // send the mail
      await sendMail(user.id, email, 'forgot password');

      res.status(201).json({
        message: `Sent a password reset email to ${email}`
      });
    } else {
      res.status(400);
      throw new Error('Email does not belong to a user');
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Could not send the mail. Please retry.');
  }
});


// @desc reset password of any verified user
// @route PUT /api/users/reset
// @access PUBLIC
const resetUserPassword = asyncHandler(async (req, res) => {
  try {
    // update the user password if the jwt is verified successfully
    const { passwordToken, password } = req.body;
    console.log(passwordToken)
    console.log(password)

    let payload = null
    try {
      payload = jwt.verify(
        passwordToken,
        process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET
      );
    } catch (err) {
      return res.status(500).send(err)
    }
    //const user = await User.findById(payload._id);
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(payload.id) }).exec()

    if (user && password) {
      user.password = password;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt)
      const updatedUser = await user.save();

      if (updatedUser) {
        res.status(200).json({
          id: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
          password: updatedUser.password
        });
      } else {
        res.status(401);
        throw new Error('Unable to update password');
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error('User not found.');
  }
});


// @desc search for users via search bar (searched for q in username)
// @route POST /api/users/search
// @access PUBLIC => private
const searchUser = asyncHandler(async (req, res) => {

  // TODO - fix so that your own profile does not pop up in search

  try {
    const payload = req.body.payload
    // Changed
    // let search = await User.find({username: {$regex: new RegExp(payload), $options:"i"}, $ne: req.user.id}).exec();
    let search = await User.find({ username: { $regex: new RegExp(payload), $options: "i" } }).exec();

    // Limit search results to 7
    search = search.slice(0, 20)
    // search = search.

    res.send({ payload: search })

  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Could not find any matching user.")
  }
})

// @desc    Get another user's profile by their username
// @route   GET /api/users/:username
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {

  const username = req.params.username

  try {
    const user = await User.findOne({ username })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      about: user.about,
      username: user.username,
      profilePicture: user.profilePicture,
      followers: user.followers,
      following: user.following, // May need more data
      anthem: user.anthem, //! Added this
      posts: user.posts
    });

  } catch (error) {
    res.status(500).json("Could not find user: " + error)
  }
})

// @desc    Get all posts belonging to users user is following
// @route   GET /api/users/:id/getFollowingPosts
// @access  Public
const getFollowingPosts = asyncHandler(async (req, res) => {

  const id = req.params.id;
  const user = await User.findById(mongoose.Types.ObjectId(id));

  if (!user) {
    res.status(400);
    throw new Error('Cannot Find User');
  }

  let followingPosts = [];
  let following = user.following;
  for (let i = 0; i < following.length; i++) {
    let friend = await User.findById(following[i])
    if (!friend) {
      console.log("Following no longer exists")
      await user.updateOne({ $pull: { following: following[i] } });
    }
    else {
      var posts = friend.posts;
      for (let j = 0; j < posts.length; j++) {
        let post = await Post.findById(mongoose.Types.ObjectId(posts[j]));
        if (!post) {
          console.log("Post Could not be found")
          await friend.updateOne({ $pull: { posts: friend.posts[j] } })
        }
        else {
          var postData = {}
          postData['img'] = post.picture;
          postData['name'] = friend.name;
          postData['username'] = friend.username;
          postData['caption'] = post.caption;
          postData['likes'] = post.likes.length;
          postData['id'] = post._id
          postData['author'] = friend._id;
          postData['createdAt'] = post.createdAt;
          if (friend["profilePicture"]) { postData["profileImage"] = friend.profilePicture; }
          if (post.song) { postData['song'] = post.song; }
          if (post.image) { postData['image'] = post.image; }
          if (post.url) { postData['url'] = post.url; }
          if (post.artist) { postData['artist'] = post.artist; }
          if (post.playlist) { postData['palylist'] = post.playlist; }

          if (post.likes.includes(id)) {
            postData['liked'] = true;
          }
          else {
            postData['liked'] = false;
          }

          followingPosts.push(postData)
        }
      }
    }
  }
  var posts = user.posts;
  for (let i = 0; i < posts.length; i++) {
    let post = await Post.findById(mongoose.Types.ObjectId(posts[i]));
    if (!post) {
      console.log("Post Could not be found")
      await friend.updateOne({ $pull: { posts: user.posts[i] } })
    }
    else {
      var postData = {}
      postData['img'] = post.picture;
      postData['name'] = user.name;
      postData['username'] = user.username;
      postData['caption'] = post.caption;
      postData['likes'] = post.likes.length;
      postData['id'] = post._id
      postData['author'] = user._id;
      postData['createdAt'] = post.createdAt;
      if (user["profilePicture"]) { postData["profileImage"] = user.profilePicture; }
      if (post.song) { postData['song'] = post.song; }
      if (post.image) { postData['image'] = post.image; }
      if (post.url) { postData['url'] = post.url; }
      if (post.artist) { postData['artist'] = post.artist; }
      if (post.playlist) { postData['palylist'] = post.playlist; }

      if (post.likes.includes(id)) {
        postData['liked'] = true;
      }
      else {
        postData['liked'] = false;
      }
      followingPosts.push(postData)
    }
  }

  function compareDates(a, b) {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    else if (a.createdAt < b.createdAt) {
      return 1;
    }
    else {
      return 0;
    }
  }

  followingPosts.sort(compareDates);

  if (followingPosts.length == 0) {

    res.status(201).json(followingPosts)
    // res.status(400);
    // throw new Error('User has no following posts');
  }
  res.status(201).json(followingPosts)
});

// @desc    Get all posts belonging to users user is following
// @route   PUT /api/users/putTopArtist
// @access  Public
const putTopArtist = asyncHandler(async (req, res) => {

  // console.log("IN PUT TOP ARTIST")
  const userId = req.user.id;
  const { topArtist } = req.body; 
  const user = await User.findByIdAndUpdate(userId, { $set: {topArtist: topArtist }}); 
  if (user)
  {
    // console.log("hello")
    // console.log(user)
    res.status(201).json(user);  
  }
  else
  {
    res.status(400);
    throw new Error("User not found");
  }
  
})

// @desc    Get all posts belonging to users user is following
// @route   GET /api/users/:id/getTopArtist
// @access  Public
const getTopArtist = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  if (!user)
  {
    res.status(400);
    throw new Error("User not found");
  }
  else
  {
    res.status(201).json(user.topArtist);
  }
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  uploadProfilePic,
  followUser,
  unfollowUser,
  verifyUser,
  mailForEmailVerification,
  mailForResetPassword,
  resetUserPassword,
  searchUser,
  getUserProfile,
  getFollowingPosts,
  putTopArtist,
  getTopArtist
}