const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  followUser,
  unfollowUser,
  mailForEmailVerification,
  mailForResetPassword,
  searchUser,
  checkExist,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update', protect, updateUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)
router.post('/confirm', mailForEmailVerification)
router.post('/reset', mailForResetPassword)
router.post('/search', searchUser)
// router.post('/exist', checkExist)

module.exports = router