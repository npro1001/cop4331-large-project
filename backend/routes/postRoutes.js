const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    createPost,
    likePost,
    unlikePost,
    commentPost,
    deleteComment
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('picture'), createPost);
router.put('/like', likePost);
router.put('/unlike', unlikePost);
router.put('/comment', commentPost);
router.delete('/deleteComment', deleteComment);

module.exports = router;