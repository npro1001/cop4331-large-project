const asyncHandler = require('express-async-handler');
const fs = require('fs');
const multer = require('multer');

const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink);

const User = require('../models/userModel');
const Post = require('../models/postModel');
const path = require('path');
  
// @desc    Create a new post
// @route   POST /api/post
// @access  Public
const createPost = asyncHandler(async (req, res) => {

    if (!req.file)
    {
        res.status(400);
        throw new Error('Please upload a file');
    }

    // Author is the objectID of the user who created the post
    var {author, caption} = req.body;
    var img = fs.readFileSync(req.file.path);
    
    if (!author || !caption || !img)
    {
        res.status(400);
        throw new Error('Please add all required elements of a post');
    }

    var encode_img = img.toString('base64');

    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };

    const post = await Post.create({
        author: author,
        caption: caption,
        picture: final_img
    }) 

    if (post) {
        res.status(201).json({
          _id: post.id,
          author: post.author,
          caption: post.username,
          picture: post.picture,
          comments: post.comments, 
          likes: post.likes,
          createdAt: post.createdAt 
        })
        await unlinkAsync(req.file.path);
    } else {
        res.status(400)
        throw new Error('Invalid post data')
    }
});

module.exports = {
    createPost
}