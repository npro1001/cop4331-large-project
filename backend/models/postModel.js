const mongoose = require('mongoose');

let User = require('./userModel');

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
        comments: [],
        likes: []
    }, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);