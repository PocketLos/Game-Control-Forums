const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');
const User = require('../models/User.js');

const createComment = async (req, res) => {
  try {
    const {
      userId,
      postId,
      description,
      commentId,
      postDescription,
      postUserName,
      commentUserName,
      commentCreatedAt,
      title,
      section
    } = req.body;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    const newComment = new Comment({
      userId,
      userName: user.userName,
      profilePicturePath: user.profilePicturePath,
      roles: user.roles,
      description,
      postId,
      postUserName,
      postDescription,
      commentId,
      commentUserName,
      commentCreatedAt,
      title,
      section
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await Comment.find({ postId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getCommentByUserName = async (req, res) => {
  try {
    const { userName } = req.params;
    const comment = await Comment.find({ userName });
    res.status(201).json(comment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getNumberOfComments = async (req, res) => {
  try {
    const numberOfComments = await Comment.countDocuments({}).exec();

    res.status(201).json(numberOfComments);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

const getNumberofCommentsBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const numberofCommentsBySection = await Comment.countDocuments({
      section: section
    }).exec();
    res.status(201).json(numberofCommentsBySection);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getCommentByPost,
  getCommentByUserName,
  getNumberOfComments,
  getNumberofCommentsBySection,
  getCommentById
};
