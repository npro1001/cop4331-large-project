const mongoose = require('mongoose');
let User = require('./userModel');

// TO DO: ADD PLAYLISTS AND SONGS
const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: [String],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        caption: String,
        picture: String,
    }, {timestamps: true});

    module.exports = mongoose.model('Post', postSchema)