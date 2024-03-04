const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin'); 
// const isUser = require('../middleware/isUser'); 

const {
    getAllPosts,
    getPostById,
    createPost,
    //updatePost,
    updatePostId,
    deletePost,} = require('../controllers/postController');
    

router.get('/',auth, getAllPosts);
router.get('/:id',auth,getPostById);
router.post('/addposts', auth, createPost);
router.put('/:id', auth,updatePostId);
// router.put('/:id', auth,updatePost);
router.delete('/:id',auth, deletePost);

module.exports = router;