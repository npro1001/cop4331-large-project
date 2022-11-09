const mongoose = require('mongoose');

let User = require('./userModel');
let Post = require('./postModel');

const commentSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    }, {timestamps: true})