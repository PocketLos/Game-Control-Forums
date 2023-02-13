const Post = require('../models/Post.js');
const User = require('../models/User.js');

// CREATE POST //
const createPost = async (req, res) => {
  try {
    const { userId, title, description, section } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      userName: user.userName,
      profilePicturePath: user.profilePicturePath,
      title,
      description,
      section
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getPostBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const post = await Post.find({ section });
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPostByUserName = async (req, res) => {
  try {
    const { userName } = req.params;
    const post = await Post.find({ userName });
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getNumberOfPosts = async (req, res) => {
  try {
    const numberOfPosts = await Post.countDocuments({}).exec();

    res.status(201).json(numberOfPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNumberofPostsBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const numberofPostsBySection = await Post.countDocuments({
      section: section
    }).exec();
    res.status(201).json(numberofPostsBySection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addLatestComment = async (req, res) => {
  try {
    const { id, latestComment } = req.body;
    const post = await Post.findById(id).exec();
    post.latestComment = latestComment;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPostBySection,
  getPostById,
  getPostByUserName,
  getNumberOfPosts,
  getNumberofPostsBySection,
  addLatestComment
};
