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


//updatepostId

const updatePostId = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.userRole === "admin" || post.userId.toString() === req.userId) {

      post.title = title;
      post.content = content;
      await post.save();
      return res.status(200).json({ message: "Post updated successfully", post });
    }
        else
        {
          return res.status(403).json({ message: "You are not authorized to update this post" });
        }


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// delete postById
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    // Récupérer le post à supprimer
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (req.userRole === "admin" || post.userId.toString() === req.userId) {
      const deletedPost = await Post.findByIdAndDelete(id);
      if (!deletedPost) {
        res.status(404).send('Post not found');
      } else {
        res.status(200).send('Post deleted successfully');
      }
    } else {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
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
  updatePostId,
  deletePost,
};