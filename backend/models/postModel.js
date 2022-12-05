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
        name: String,
        username: String,
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
        }],

        song: String,
        image: String,
        url: String,
    }, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);