const mongoose = require('mongoose');

let User = require('./userModel');
let Comment = require('./commentModel');

// TO DO: ADD PLAYLISTS AND SONGS
const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        caption: String,
        picture: {
            data: Buffer,
            contentType: String
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);