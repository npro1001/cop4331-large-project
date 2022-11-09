const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    createPost
} = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('picture'), createPost);
router.post('/single', upload.single('profile'), (req, res) => {
    try {
      res.send(req.file);
    }catch(err) {
      res.send(400);
    }
});
module.exports = router;