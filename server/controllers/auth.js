const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// REGISTER USER //
const register = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      profilePicturePath,
      roles,
      about,
      numberOfPosts,
      reputation
    } = req.body;

    const duplicateEmail = await User.findOne({ email })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    const duplicateUserName = await User.findOne({ userName })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicateEmail) {
      return res.status(409).json({ msg: 'Email already taken' });
    }

    if (duplicateUserName) {
      return res.status(409).json({ msg: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: passwordHash,
      profilePicturePath,
      roles,
      about,
      numberOfPosts,
      reputation
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const duplicateEmail = await User.findOne({ email })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicateEmail) {
      return res.status(201).json(false);
    }

    res.status(201).json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkUserName = async (req, res) => {
  try {
    const { userName } = req.params;

    const duplicateUser = await User.findOne({ userName })
      .collation({ locale: 'en', strength: 2 })
      .lean()
      .exec();

    if (duplicateUser) {
      return res.status(201).json(false);
    }

    res.status(201).json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* LOGGING IN */
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password)
      return res.status(400).json({ msg: 'All fields are required ' });

    const user = await User.findOne({ userName: userName }).exec();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch || !user)
      return res.status(401).json({ msg: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, checkEmail, checkUserName };
