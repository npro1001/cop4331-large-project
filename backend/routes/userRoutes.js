const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  mailForEmailVerification,
  mailForResetPassword
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/confirm', mailForEmailVerification)
router.post('/reset', mailForResetPassword)

module.exports = router