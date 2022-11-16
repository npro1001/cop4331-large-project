const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    createPost,
    likePost,
    unlikePost,
    commentPost
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('picture'), createPost);
router.post('/like', likePost);
router.post('/unlike', unlikePost);
router.post('/comment', commentPost);

module.exports = router;