const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// get userById
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// create a new user
const createUser = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, role });
    
    const savedUser = await newUser.save();
    
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// update a userById
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { email, password }, { new: true });
    if (!updatedUser) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// delete a userById
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).send('User not found');
    } else {
      res.status(200).send('User deleted successfully');
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {

  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
