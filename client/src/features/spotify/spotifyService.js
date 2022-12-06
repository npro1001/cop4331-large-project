// For making HTTP request and sending data in localStorage

import axios from 'axios'

const API_URL = '/api/spotify/'
let IDresult = ""
let genreResult = ""
let target = ""
let allGenres = [
    "acoustic",
    "afrobeat",
    "alt-rock",
    "alternative",
    "ambient",
    "anime",
    "bluegrass",
    "blues",
    "bossanova",
    "breakbeat",
    "chicago-house",
    "chill",
    "classical",
    "club",
    "country",
    "dance",
    "dancehall",
    "deep-house",
    "detroit-techno",
    "disco",
    "drum-and-bass",
    "dub",
    "dubstep",
    "edm",
    "electro",
    "electronic",
    "emo",
    "folk",
    "funk",
    "garage",
    "gospel",
    "goth",
    "grindcore",
    "groove",
    "grunge",
    "guitar",
    "happy",
    "hard-rock",
    "hardcore",
    "hardstyle",
    "heavy-metal",
    "hip-hop",
    "holidays",
    "honky-tonk",
    "house",
    "idm",
    "indie",
    "indie-pop",
    "industrial",
    "j-pop",
    "jazz",
    "k-pop",
    "latin",
    "latino",
    "metal",
    "metal-misc",
    "metalcore",
    "minimal-techno",
    "mpb",
    "new-age",
    "new-release",
    "party",
    "piano",
    "pop",
    "pop-film",
    "post-dubstep",
    "power-pop",
    "progressive-house",
    "psych-rock",
    "punk",
    "punk-rock",
    "r-n-b",
    "rainy-day",
    "reggae",
    "reggaeton",
    "rock",
    "rock-n-roll",
    "rockabilly",
    "romance",
    "sad",
    "salsa",
    "samba",
    "show-tunes",
    "singer-songwriter",
    "ska",
    "sleep",
    "songwriter",
    "soul",
    "soundtracks",
    "study",
    "summer",
    "synth-pop",
    "tango",
    "techno",
    "trip-hop",
    "work-out",
    "world-music"
]

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

// Generate random string
const getRandomString = length => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
}
const stateKey = 'spotify_auth_state'

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A spotify access token
 */
const connect = async () => {

    // console.log("ASDASDASDASD")
    // console.log(window.location.search)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    }

    const hasError = urlParams.get('error')
    console.log("hadError: " + hasError)

    // If theres an error OR the token has expired => refresh token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        console.log("refreshToken called")
        refreshToken()
    }

    // If theres a valid access token, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {

        // Store the query params in localStorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property])
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

        // Return access token from query params
        return queryParams[LOCALSTORAGE_KEYS.accessToken]
    }

    return false
}


/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
    console.log('inside hasTokenExpired');
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES

    if (!accessToken || !timestamp) {
        return false
    }
    const millisecondsElapsed = Date.now() - Number(timestamp)
    return (millisecondsElapsed / 1000) > Number(expireTime)
}

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => {
    try {

        // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
        if (!LOCALSTORAGE_VALUES.refreshToken ||
            LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
            (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
        ) {

            console.error('No refresh token available')
            logout()
        }

        // Use `/refresh_token` endpoint from our Node app
        const { data } = await axios.get(`/api/spotify/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`)

        // Update localStorage values
        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token)
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

        // Reload the page for localStorage updates to be reflected
        window.location.reload()

        console.log("TOKEN WAS REFRESHED")

    } catch (e) {
        console.error(e)
    }
}

export const logout = () => {
    localStorage.removeItem('spotify_access_token')
    localStorage.removeItem('spotify_refresh_token')
    localStorage.removeItem('spotify_token_expire_time')
    localStorage.removeItem('spotify_token_timestamp')
}

// export const accessToken = connect()

// /**
//  * Axios global request headers
//  */

//  axios.defaults.baseURL = 'https://api.spotify.com/v1';
//  axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
//  axios.defaults.headers['Content-Type'] = 'application/json';
//  axios.defaults.headers['Allow-Access-Control-Origin'] = '*';

export const accessToken = connect()
// {\n  \"error\": {\n    \"status\": 400,\n    \"message\": \"Only valid bearer authentication supported\"\n  }\n}"

// @desc    Get user's top artist
// @route   GET /api/spotify/top_artist
// @access  Private
export const getTopArtist = async () => {

    //! NEED TO HANDLE REFRESH TOKEN PROBLEMS
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/me/top/artists?limit=3&time_range=long_term`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`
            }
        })

        target = response.data.items[0].id
        IDresult = target.concat(",", response.data.items[2].id)

        target= response.data.items[0].genres[0].toString();
        if(allGenres.includes(target)) genreResult = target
        // genreResult = target //.concat(",", response.data.items[1].genres[1].toString())

        if (response) return response;
    } catch (error) {
        console.error(error)
        return false
    }
}


// @desc    Get user's top artist
// @route   GET /api/spotify/top_genre
// @access  Private
export const getTopGenre = async () => {

    //! NEED TO HANDLE REFRESH TOKEN PROBLEMS
    try {
        console.log("getTopGenre was called")
        console.log(localStorage.getItem(LOCALSTORAGE_KEYS.accessToken));
        const response = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`
            }
        })
        console.log(response);
        console.log(response.items[0]);
        if (response) return response;
    } catch (error) {
        console.error(error)
        return false
    }
}

// @desc    Get recommended songs
// @route   GET /api/spotify/recommendSongs
// @access  Private
export const recommendSongs = async (token, user) => {

    console.log(genreResult)

    //if genre result is empty, get 5 random ones from the list above
    if (genreResult == "") {

        let choices = Array.from(Array(90), (x, i) => i)
        var num = Math.floor(Math.random() * choices.length);

        var pick = choices.splice(num, 1) // remove number from array
        let one = pick;
        console.log(one)

        num = Math.floor(Math.random() * choices.length);
        let two = choices.splice(num, 1)
        console.log(two)

        num = Math.floor(Math.random() * choices.length);
        let three = choices.splice(num, 1)
        console.log(three)

        num = Math.floor(Math.random() * choices.length);
        let four = choices.splice(num, 1)
        console.log(four)


        num = Math.floor(Math.random() * choices.length);
        let five = choices.splice(num, 1)
        console.log(five)

        

        genreResult += allGenres[one]+","+allGenres[two]+","+allGenres[three]+","+allGenres[four]+","+allGenres[five]

        console.log(genreResult)
    }
    const response = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/recommendations?seed_genres=${genreResult}`,
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': `Bearer ${LOCALSTORAGE_VALUES.accessToken}`
        }
    });
    return response;
};

// @desc    Get user's top artist
// @route   GET /api/spotify/top_genre
// @access  Private
// API documentation: https://developer.spotify.com/documentation/web-api/reference/#/operations/search
export const searchTracks = async (param) => {
    try {

        const token = localStorage.getItem(LOCALSTORAGE_KEYS.accessToken);
        const response = await axios({
            method: 'get',
            url: `https://api.spotify.com/v1/search?q=${param}&type=track&include_external=audio&limit=7`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.accessToken)}`
            }
        })
        // console.log(response);
        // console.log(response.items);
        if (response) return response;
    } catch (error) {
        console.error(error)
        return false
    }
}


const spotifyService = {
    connect,
    refreshToken,
    hasTokenExpired,
    logout,
    getTopArtist,
    getTopGenre,
    recommendSongs,
    searchTracks,
}

export default spotifyService
