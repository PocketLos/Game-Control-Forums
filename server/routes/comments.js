const express = require('express');
const {
  createComment,
  getCommentByPost,
  getCommentByUserName,
  getNumberOfComments,
  getNumberofCommentsBySection,
  getCommentById
} = require('../controllers/comments.js');
const verifyToken = require('../middleware/auth.js');

const router = express.Router();
router.post('/', createComment);
router.get('/:postId', getCommentByPost);
router.get('/id/:id', getCommentById);
router.get('/activity/:userName', getCommentByUserName);
router.post('/total', getNumberOfComments);
router.post('/totalbysection/:section', getNumberofCommentsBySection);

module.exports = router;
