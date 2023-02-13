const Post = require('../models/Post.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');
const Section = require('../models/Section.js');

const getSectionByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const section = await Section.find({ category });
    res.status(201).json(section);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getSection = async (req, res) => {
  try {
    const section = await Section.find();
    res.status(200).json(section);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

const createSection = async (req, res) => {
  try {
    const { title, description, category, link } = req.body;

    const newSection = new Section({
      title,
      description,
      category,
      link,
      numberOfPosts: await Post.countDocuments({
        section: link
      }).exec(),
      numberOfComments: await Comment.countDocuments({
        section: link
      }).exec()
    });

    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { getSectionByCategory, createSection, getSection };
