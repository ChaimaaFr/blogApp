const Post = require('../models/Post');
const jwt = require('jsonwebtoken');


// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// get postById
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).send('Post not found');
    } else {
      res.status(200).send(post);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// create a post
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId; 

  try {
    const newPost = new Post({ title, content, userId });
    const savedPost = await newPost.save();
    res.status(201).send(savedPost);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// update postById
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content });
    if (!updatedPost) {
      res.status(404).send('Post not found');
    } else {
      res.status(200).send(updatedPost);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// delete postById
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      res.status(404).send('Post not found');
    } else {
      res.status(200).send('Post deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};