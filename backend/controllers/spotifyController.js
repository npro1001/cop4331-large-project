const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
require ('dotenv').config()
const express = require('express')
const querystring  = require('querystring');
const axios = require('axios')
const { STATUS_CODES } = require('http');
const { query } = require('express');
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const SPOTIFY_URL = 'https://accounts.spotify.com/authorize'

// Generate random string
const getRandomString = length => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
}

const stateKey = 'spotify_auth_state'

// @desc    Connect to spotify
// @route   GET /api/spotify/connect
// @access  Private
const connectToSpotify = asyncHandler(async (req, res) => {

    console.log("spotify controller")
    const state = getRandomString(16)
    res.cookie(stateKey, state)

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read', 
    ].join(' ');

    const params = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    })

    //! REDIRECT TRIGGERS CORS
    res.redirect(302, `https://accounts.spotify.com/authorize?${params}`)
})

// @desc    Callback for spotify auth
// @route   GET /api/spotify/callback
// @access  Private
const spotifyAuthCallback = asyncHandler(async (req, res) => {
    const code = req.query.code || null
    console.log("In the callback function")
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content_type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        }
    })
    .then(response => {
        if (response.status === 200) {
            const { access_token, refresh_token, expires_in } = response.data

            
            // Redirect to react app
            // Pass along tokens in query parameters
            const params = querystring.stringify({
                access_token,
                refresh_token,
                expires_in,
            })
            res.redirect(`http://localhost:3000?${params}`)
            
        
        } else {
            res.redirect(`/?${querystring.stringify({error: "invalid_token"})}`)
        }
    })
    .catch(error => {
        res.send(error)
    })
    .catch(error => {
        res.send(error)
    })
})

// @desc    Refresh spotify auth token
// @route   GET /api/spotify/refresh_token
// @access  Private
const getRefreshToken = asyncHandler(async (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.send(error);
    })
})

module.exports = {
    connectToSpotify,
    spotifyAuthCallback,
    getRefreshToken
}