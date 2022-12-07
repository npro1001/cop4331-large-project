const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    createPost,
    createPostWithoutImage,
    deletePost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('picture'), createPost);
router.post('/withoutImage', protect, createPostWithoutImage);
router.put('/delete', protect, deletePost);
router.put('/like', protect, likePost);
router.put('/unlike', protect, unlikePost);
router.put('/comment', protect, commentPost);
router.put('/deleteComment', protect, deleteComment);

module.exports = router;