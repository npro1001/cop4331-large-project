require ('dotenv').config()
const express = require('express')
const urlParams = require('urlsearchparams')
const axios = require('axios')
const { STATUS_CODES } = require('http');
const { query } = require('express');
const app = express()
const port = 5555;

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`)
})