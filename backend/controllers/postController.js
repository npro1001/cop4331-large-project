const asyncHandler = require('express-async-handler');
const multer = require('multer');

const User = require('../models/userModel');
const Post = require('../models/postModel');

// @desc    Create a new post
// @route   POST /api/post
// @access  Public
const createPost = asyncHandler(async (req, res) => {
    const { author, caption} = req.body;
    const {img} = req.file;
});

