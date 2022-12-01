const asyncHandler = require('express-async-handler');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
var path = require('path');

const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
  
// @desc    Create a new post
// @route   POST /api/post
// @access  Public
const createPost = asyncHandler(async (req, res) => {

    console.log('aaaaaa')
    if (!req.file)
    {
        res.status(400);
        throw new Error('Please upload a file');
    }

    // Author is the objectID of the user who created the post
    var {author, caption} = req.body;
    var imgPath = __dirname + '/../middleware/temp/';
    var img = fs.readFileSync(path.join(imgPath + req.file.filename));
    
    if (!author || !caption || !img)
    {
        res.status(400);
        throw new Error('Please add all required elements of a post');
    }

    // var encode_img = img.toString('base64');

    var final_img = {
        contentType:req.file.mimetype,
        data: img
    };

    const post = await Post.create({
        author: author,
        caption: caption,
        picture: final_img
    }) 

    if (post) {
        await User.findByIdAndUpdate(author, { $push: { posts: post._id } });

        res.status(201).json({
          _id: post.id,
          author: post.author,
          caption: post.username,
          picture: post.picture,
          comments: post.comments, 
          likes: post.likes,
          createdAt: post.createdAt 
        })
        await unlinkAsync(imgPath + req.file.filename);
    } else {
        res.status(400);
        throw new Error('Invalid post data');
    }
});

// @desc    Create a new post
// @route   DELETE /api/post/delete
// @access  Public
const deletePost = asyncHandler(async (req, res) => {

    const {postId} = req.body;

    const post = await Post.findById(mongoose.Types.ObjectId(postId));
    if (!post)
    {
        res.status(400);
        throw new error("Post does not exist");
    }
    const user = await User.findById(mongoose.Types.ObjectId(post.author));
    if (!user)
    {
        res.status(400);
        throw new error("Cannot find author");
    }

    await user.updateOne({ $pull: { posts: postId } });
    await Post.findByIdAndDelete(mongoose.Types.ObjectId(postId));

    res.status(200).json({User: user._id});

});

// @desc    like a post
// @route   PUT /api/post/like
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
        if (user.likes.includes(post._id) || post.likes.includes(user._id))
        {
            res.status(400);
            throw new Error('Post Has Already Been Liked');
        }

        await user.updateOne({ $push: { likes: post._id } });
        await post.updateOne({ $push: { likes: user._id } });

        res.status(201).json({
            username: user.username,
            userlikes: user.likes,
            postId: post._id,
            postLikes: post.likes
        });
    }
});

// @desc unlike a post
// @route PUT /api/post/unlike
// @access Public
const unlikePost = asyncHandler(async (req, res) => {
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
        if (!user.likes.includes(post._id) || !post.likes.includes(user._id))
        {
            res.status(400);
            throw new Error('Post Has Not Already Been Liked');
        }

        await user.updateOne({ $pull: { likes: post._id } });
        await post.updateOne({ $pull: { likes: user._id } });

        res.status(201).json({
            username: user.username,
            userlikes: user.likes,
            postId: post._id,
            postLikes: post.likes
        });
    }
});

// @desc    Comment on a post
// @route   PUT /api/post/comment
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
            await user.updateOne({ $push: { comments: comment } });
            await post.updateOne({ $push: { comments: comment } });

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

// @desc    Delete a comment on a post
// @route   DELETE /api/post/deleteComment
// @access  Public
const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.body;

    const comment = await Comment.findById(mongoose.Types.ObjectId(commentId)); 
    if (!comment)
    {
        res.status(400);
        throw new error("Comment does not Exist")
    }
    const user = await User.findById(mongoose.Types.ObjectId(comment.author));
    if (!user)
    {
        res.status(400);
        throw new error("Author could not be found");
    }

    const post = await Post.findById(mongoose.Types.ObjectId(comment.post))
    if (!post)
    {
        res.status(400);
        throw new error("Post could not be found");
    }

    if (!user.comments.includes(commentId) || !post.comments.includes(commentId))
    {
        res.status(400);
        throw new error("Comment has not been added to post or user");
    }

    await user.updateOne({ $pull: { comments: commentId } });
    await post.updateOne({ $pull: { comments: commentId } });

    await Comment.findByIdAndDelete(mongoose.Types.ObjectId(commentId));

    res.status(200).json({
        userComments: user.comments,
        postComments: post.comments,
    });
});

module.exports = {
    createPost,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment,
}