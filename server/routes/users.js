const express = require('express');
const {
  getUser,
  getUserByUserName,
  updateUser,
  getNumberOfUsers
} = require('../controllers/users.js');
const verifyToken = require('../middleware/auth.js');

const router = express.Router();

// READ //
router.get('/:id', getUser);
router.get('/account/:userName', getUserByUserName);
router.post('/total', getNumberOfUsers);

module.exports = router;
