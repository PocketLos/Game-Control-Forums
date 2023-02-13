const express = require('express');
const {
  getSectionByCategory,
  getSection,
  createSection
} = require('../controllers/section.js');
const verifyToken = require('../middleware/auth.js');

const router = express.Router();

router.post('/create', createSection);
router.get('/all', getSection);

module.exports = router;
