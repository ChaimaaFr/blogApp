// require('dotenv').config(); // Load environment variables from .env file
const MONGODB_URIURI= `mongodb://127.0.0.1:27017/mydatabase`
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');


// const authRoutes = path.resolve(__dirname, 'src', 'routes', 'authRoutes');
// const userRoutes = path.resolve(__dirname, 'src', 'routes', 'userRoutes');
// const postRoutes = path.resolve(__dirname, 'src', 'routes', 'postRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Connect to db
mongoose.connect(MONGODB_URIURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

//les routes 
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
//
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

//
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


