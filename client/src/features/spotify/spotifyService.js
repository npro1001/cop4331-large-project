// For making HTTP request and sending data in localStorage

import axios from 'axios'

const API_URL = '/api/spotify/'

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
    refreshToken:  window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime:  window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp:  window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}


/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A spotify access token
 */
const connect = async () => { 

    console.log("ASDASDASDASD")
    console.log(window.location.search)
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    }

    const hasError = urlParams.get('error')
    
    // If theres an error OR the token has expired => refresh token
    if(hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken()
    }
    
    // If theres a valid access token, use that
    if(LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken
    }
    
    // If there is a token in the URL query params, user is logging in for the first time
    if(queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        
        // Store the query params in localStorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property])
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

        // Return access token from query params
        return queryParams[LOCALSTORAGE_KEYS.accessToken]
    }
    //!!! HERE NOW

    return null
}


/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
 const hasTokenExpired = () => {
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
      const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`)
  
      // Update localStorage values
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token)
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())
  
      // Reload the page for localStorage updates to be reflected
      window.location.reload()
  
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
// axios.defaults.headers['Allow-Access-Control-Origin'] = '*';

const spotifyService = {
    connect,
    refreshToken,
    hasTokenExpired,
    logout,
} 

export default spotifyService