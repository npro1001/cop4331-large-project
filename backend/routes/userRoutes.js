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
  verifyUser,
  mailForResetPassword,
  resetUserPassword,
  searchUser,
  getUserProfile
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
router.get('/verify/:token', verifyUser)
router.post('/resetEmail', mailForResetPassword)
router.get('/reset/:token', resetUserPassword)
router.post('/search', searchUser)
router.get('/:username', getUserProfile)


module.exports = router