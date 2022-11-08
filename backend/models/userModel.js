const mongoose = require('mongoose')

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
    followers: [], 
    following: []
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)