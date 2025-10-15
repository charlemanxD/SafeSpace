const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth'); // Imported JWT TOKEN created during SignIn


// -------------- Post Routes --------------

// @route GET  /api/posts
// @desc Fetch all Posts (main feed)
router.get('/', postController.getAllPosts);

// @route POST /api/posts
// @desc Create a New Post -- RQUIRE VALID JWT TOKEN
router.post('/', auth, postController.createPost);


// @route GET /api/posts/:id
// desc Fetch a Post by _id
router.get('/:d', postController.getPostById);



// -------------- Comment Routes --------------

// @route POST /api/posts/:postId/comments
// @desc Create a Comment
router.post('/:postId/comments', auth, postController.addComment);



// @route GET /api/posts/:postId/comments
// @desc Fetch all comments of a Post
router.get('/:postId/comments', postController.getCommentsByPost);



// -------------- Likes Routes --------------

// @ route PUT /api/posts/:postId/like
// @desc like/Unlike a Post
router.put('/:postId/like', auth, postController.toggleLike);



// TODO -- ADD UPDATE & DELETE Routes later


module.exports = router;