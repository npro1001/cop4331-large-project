require ('dotenv').config()
const express = require('express')
const urlParams = require('urlsearchparams')
const axios = require('axios')
const { STATUS_CODES } = require('http');
const { query } = require('express');
const app = express()
const port = 5555;

// Signup route
app.get("/signup", (req, res) => {
    console.log("signup")
})


// Login route
app.get("/login", (req, res) => {
    console.log("login to anthem")
})


// Homepage
app.get("/", (req, res) => {
    console.log("homepage")
})


// Profile settings
app.get("/edit_profile", (req, res) => {
    console.log("homepage")
})


/* SPOTIFY AUTHENTICATION */

    // Generate random string for spotify_auth_state
    const genRandomString = length => {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for(let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text;
    }
    const stateKey = 'spotify_auth_state' // To be used later

    // Routes
    app.get("/connect_to_spotify", (req, res) => {
        console.log("authorize account for spotify")
    })

    app.get("/connect_to_spotify/callback", (req, res) => {
        console.log("callback route for spotify auth")
    })

    app.get('/refresh_token', (req, res) => {
        console.log("refresh spotify access token")
    })

    
/* ********** */
    
// Server is listening on port X
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
})