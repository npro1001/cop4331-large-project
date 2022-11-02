const express = require('express')
const router = express.Router()
const {
  connectToSpotify,
  spotifyAuthCallback,
  getRefreshToken,
} = require('../controllers/spotifyController')
const { protect } = require('../middleware/authMiddleware')

router.get('/connect', connectToSpotify)
router.get('/callback', spotifyAuthCallback)
router.get('/refresh_token', getRefreshToken) // protect makes it crash

module.exports = router