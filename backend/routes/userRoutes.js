const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  mailForEmailVerification,
  mailForResetPassword,
  searchUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update', protect, updateUser)
router.post('/confirm', mailForEmailVerification)
router.post('/reset', mailForResetPassword)
router.post('/search', searchUser)

module.exports = router