const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const sendMail = require('../utils/sendMail')
const userModel = require('../models/userModel')

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
  const emailExists = await User.findOne({ email })
  const usernameExists = await User.findOne({ username })

  if (emailExists || usernameExists) {
    res.status(400)
    throw new Error('User already exists')
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
      username: user.username,
      isConfirmed: user.isConfirmed,
      about: user.about,
      followers: user.followers, 
      following: user.following,
      token: generateToken(user._id)
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
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
      isConfirmed: user.isConfirmed,
      about: user.about, 
      followers: user.followers, 
      following: user.following
    })
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

//SHOULD WE ONLY RETURN CERTAIN VARIABLES IN THE GETME AND GETUSER FUNCTIONS
//OR ARE WE RETURNING THE ENTIRE OBJECT

//Get user? or is that just search


// @desc    Update user
// @route   PUT /api/user/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  //const user = await User.findById(req.user.id)
  const User = await User.findById(req.user.id)

  
  if (!User) {
    res.status(400)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (User.id !== req.body.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if(User.password != req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }

  const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedUser)
})


// Follow a User
const followUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
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

		const user = await User.findOne({ email });
		console.log(user);
		if (user) {
			// send a verification email, if this user is not a confirmed email
			if (!user.isConfirmed) {
				// send the mail
				await sendMail(user._id, email, 'email verification');
				res.status(201).json({
					id: user._id,
          name: user.name,
					email: user.email,
					isConfirmed: user.isConfirmed,
				});
        //TODO: when the user clicks the email link, isConfirmed needs to be changed to true
			} else {
				res.status(400);
				throw new Error('User already confirmed');
			}
		}
	} catch (error) {
		console.log(error);
		res.status(401);
		throw new Error('Could not send the mail. Please retry.');
	}
});


// @desc send a mail with the link to reset password
// @route POST /api/users/reset
// @access PUBLIC
const mailForResetPassword = asyncHandler(async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });
		console.log(user);
		if (user) {
			// send the mail
			await sendMail(user._id, email, 'forgot password');
      
			res.status(201).json({
				id: user._id,
        name: user.name,
				email: user.email,
				isConfirmed: user.isConfirmed,
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

// @desc search for users via search bar (searched for q in username)
// @route POST /api/users/search
// @access PUBLIC => private
const searchUser = asyncHandler(async (req, res) => {
  try {
    const payload = req.body.payload

    let search = await User.find({username: {$regex: new RegExp(payload), $options:"i"}}).exec();

    // Limit search results to 5
    search = search.slice(0, 5)

    res.send({payload: search})

  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Could not find any matching user.")
  }
})


module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  followUser,
  mailForEmailVerification,
  mailForResetPassword,
  searchUser
}