const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// signup
const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id, role: newUser.role }, 'secretkey', { expiresIn: '1h' });
    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



// Connexion d'un utilisateur existant
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    console.log(token); // <-- Déplacez cette ligne après la déclaration de 'token'
    res.status(200).send({ token });
  } catch (error) {
    console.log('error',error);
    res.status(500).send(error.message);
  }
};


module.exports = {
  signUp,
  login
};
