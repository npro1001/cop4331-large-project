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
  getUserProfile,
  getFollowingPosts,
  putTopArtist,
  getTopArtist
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe) //!
router.put('/update', protect, updateUser)
router.put('/:id/follow', protect, followUser) //!
router.put('/:id/unfollow', protect, unfollowUser) //!
router.post('/uploadProfilePic', protect, upload.single('picture'), uploadProfilePic); //!
router.post('/confirm', mailForEmailVerification)
router.get('/verify/:token', verifyUser);
router.post('/resetEmail', mailForResetPassword);
router.put('/reset', resetUserPassword);
router.post('/search', searchUser);
router.get('/:username', getUserProfile);
router.get('/:id/getFollowingPosts', protect, getFollowingPosts);
router.put('/putTopArtist', protect, putTopArtist);
router.get('/:id/getTopArtist', protect, getTopArtist) ;

module.exports = router