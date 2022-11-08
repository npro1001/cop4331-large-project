const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const sendMail = require('../utils/sendMail')

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
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
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
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email, username, profilePicture, about} = await User.findById(req.user.id)
  res.status(200).json({
    id: _id, 
    name,
    email,
    username,
  })
})


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





module.exports = {
  registerUser,
  loginUser,
  getMe,
  //getUser,
  mailForEmailVerification
}