const express = require('express');
const { login, checkEmail, checkUserName } = require('../controllers/auth.js');

const router = express.Router();
router.post('/login', login);
router.get('/checkemail/:email', checkEmail);
router.get('/checkuser/:userName', checkUserName);

module.exports = router;
