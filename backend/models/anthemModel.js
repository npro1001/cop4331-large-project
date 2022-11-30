const mongoose = require('mongoose');

let Post = require('./postModel');
let Comment = require('./commentModel');
let User = require('./userModel');

const anthemSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        id: {
            type: String,
        },
        title: {
            type: String,
        },
        artist1: {
            type: String,
        },
        artist2: {
            type: String,
        },
        image: {
            type: String,
        },
        url: {
            type: String,
        }

    });

module.exports = mongoose.model('Anthem', anthemSchema);