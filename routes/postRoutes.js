// postRoutes.js

const express = require('express');
const router = express.Router();

// Import your post controller
const { createPost } = require('../controllers/postController');

// POST /api/posts
router.post('/', createPost);

module.exports = router;
