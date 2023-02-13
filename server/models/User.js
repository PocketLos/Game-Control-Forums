const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 6,
      max: 16,
      unique: true
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      max: 50
    },
    profilePicturePath: {
      type: String,
      default: 'default.jpg'
    },
    roles: {
      type: String,
      default: 'Member'
    },
    about: String,
    numberOfPosts: String,
    reputation: String
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
