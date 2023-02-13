const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  lastpost: {
    type: String,
    default: ''
  },
  numberOfPosts: {
    type: String
  },
  numberOfComments: {
    type: String
  }
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;
