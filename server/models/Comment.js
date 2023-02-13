const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    roles: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    userPicturePath: {
      type: String
    },
    postId: {
      type: String,
      required: true
    },
    postUserName: {
      type: String,
      required: true
    },
    postDescription: {
      type: String
    },
    commentId: {
      type: String
    },
    commentUserName: {
      type: String
    },
    commentCreatedAt: {
      type: String
    },
    commentDescription: {
      type: String
    },
    profilePicturePath: String,
    reactions: {
      type: Map,
      of: Boolean
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
