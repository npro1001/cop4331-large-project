const express = require('express')
const multer = require('multer');
const router = express.Router()

const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  followUser,
  unfollowUser,
  uploadProfilePic,
  mailForEmailVerification,
  mailForResetPassword,
  searchUser,
  //checkExist,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update', protect, updateUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)
router.post('/uploadProfilePic', upload.single('picture'), uploadProfilePic);
router.post('/confirm', mailForEmailVerification)
router.post('/reset', mailForResetPassword)
router.post('/search', searchUser)
// router.post('/exist', checkExist)

module.exports = router