const express = require('express');
const router = express.Router();
const {
    createPost
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', createPost);

module.exports = router;