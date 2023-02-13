const express = require('express');
const {
  getPostBySection,
  getPostById,
  getPostByUserName,
  getNumberOfPosts,
  getNumberofPostsBySection,
  addLatestComment
} = require('../controllers/posts.js');
const verifyToken = require('../middleware/auth.js');

const router = express.Router();

// READ //
router.get('/:section/posts', getPostBySection);
router.get('/:id/', getPostById);
router.get('/activity/:userName', getPostByUserName);
router.post('/total', getNumberOfPosts);
router.post('/totalbysection/:section', getNumberofPostsBySection);
router.patch('/latestcomment/:id', addLatestComment);
module.exports = router;
