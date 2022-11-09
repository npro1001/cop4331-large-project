const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  mailForEmailVerification,
  mailForResetPassword
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/update/:id', protect, updateUser)
router.post('/confirm', mailForEmailVerification)
router.post('/reset', mailForResetPassword)

module.exports = router