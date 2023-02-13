const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userPicturePath: {
      type: String
    },
    section: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    profilePicturePath: String,
    reactions: {
      type: Map,
      of: Boolean
    },
    latestComment: {
      type: String
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
