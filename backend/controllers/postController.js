const asyncHandler = require('express-async-handler');
const fs = require('fs');
const multer = require('multer');
var mongoose = require('mongoose');

const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink);

const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
  
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

// @desc    like a post
// @route   POST /api/post/like
// @access  Public
const likePost = asyncHandler(async (req, res) => {
    // Pass user ID and post ID
    const {postId, userId} = req.body;

    const post = await Post.findById(mongoose.Types.ObjectId(postId));
    const user = await User.findById(mongoose.Types.ObjectId(userId));

    if (!user)
    {
        res.status(400);
		throw new Error('Cannot Find User');
    }
    else if (!post)
    {
        res.status(400);
		throw new Error('Cannot Find Post');
    }
    else
    {
        (user.likes).push(post._id);
        (post.likes).push(user._id);
        user.save();
        post.save();

        res.status(201).json({
            username: user.username,
            userlikes: user.likes,
            postId: post._id,
            postLikes: post
        });
    }
})

// @desc    Comment on a post
// @route   POST /api/post/comment
// @access  Public
const commentPost = asyncHandler(async (req, res) => {
    // Pass user ID and post ID
    const {postId, userId, content} = req.body;

    const post = await Post.findById(mongoose.Types.ObjectId(postId));
    const user = await User.findById(mongoose.Types.ObjectId(userId));

    if (!user)
    {
        res.status(400);
		throw new Error('Cannot Find User');
    }
    else if (!post)
    {
        res.status(400);
		throw new Error('Cannot Find Post');
    }
    else if (!content)
    {
        res.status(400);
        throw new Error('Please enter a comment')
    }
    else
    {
        const comment = await Comment.create({
            author: userId,
            post: postId,
            content: content
        });

        if (comment)
        {
            (user.comments).push(comment._id);
            (post.comments).push(comment._id);
            user.save();
            post.save();

            res.status(201).json({
                username: user.username,
                postId: post._id,
                comment: content
            });
        }
        else
        {
            res.status(400);
            throw new Error('Could not create comment');
        }
    }
});

module.exports = {
    createPost,
    likePost,
    commentPost
}