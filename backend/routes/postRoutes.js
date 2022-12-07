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

router.post('/', upload.single('picture'), createPost);
router.post('/withoutImage', createPostWithoutImage);
router.put('/delete', deletePost);
router.put('/like', likePost);
router.put('/unlike', unlikePost);
router.put('/comment', commentPost);
router.put('/deleteComment', deleteComment);

module.exports = router;