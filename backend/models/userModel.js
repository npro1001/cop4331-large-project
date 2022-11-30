const mongoose = require('mongoose');

let Post = require('./postModel');
let Comment = require('./commentModel');
let Anthem = require('./anthemModel');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isConfirmed: {
			type: Boolean,
			required: true,
			default: false,
		},
    about:{
      type: String,
      required: false,
    }, 
    anthem:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anthem'
    }, 
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
    profilePicture: {
      data: Buffer,
      contentType: String
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)