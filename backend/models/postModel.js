const mongoose = require('mongoose');
let User = require('./userModel');

const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: false,
        }
    }
)

