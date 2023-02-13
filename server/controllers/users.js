const User = require('../models/User.js');
const bcrypt = require('bcrypt');

// READ //
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getUser };

const getUserByUserName = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, email, profilePicturePath, about } = req.body;
    const user = await User.findById(id).exec();
    user.email = email;
    user.about = about;
    user.profilePicturePath = profilePicturePath;

    // if (password) {
    //   // Hash password
    //   user.password = await bcrypt.hash(password, 10); // salt rounds
    // }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getNumberOfUsers = async (req, res) => {
  try {
    const numberOfUsers = await User.countDocuments({}).exec();

    res.status(201).json(numberOfUsers);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, getUserByUserName, updateUser, getNumberOfUsers };
