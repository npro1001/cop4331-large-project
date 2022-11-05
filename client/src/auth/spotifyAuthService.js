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
const connect = async () => { //! ERROR LOCATION NO QUERYSTRING

    const queryString = null;

    // // const response = await axios.get(`http://localhost:3000${API_URL}`)
    const response = await axios.get(API_URL + 'connect')
    if(response.data) {
        console.log(response.data)
        queryString = response.queryParams
    }
        // .then(function(response) {
        //     console.log(response.data.url)
        //     queryString = response.queryParams
        // }).catch(err => {
        //     console.log(err)
        // })
    // // const response = await fetch(API_URL)
    // // const response = await fetch(`http://localhost:5555${API_URL}`, {
    // //     method: "GET"
    // // })
    // console.log(API_URL)
    // console.log(response) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     
    // const queryString = window.location.search
    // const queryString = response.queryParams
    
    // const response = await axios.get(API_URL + "connect")
    // if(response.data) {
    //     console.log(response.data)
    //     queryString = response.queryParams //!
    // }

    const urlParams = new URLSearchParams(queryString)
    console.log(urlParams) //!

    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    }
    console.log("error incoming")
    const hasError = urlParams.get('error')
    console.log(urlParams.get('error'))
    
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
    console.log("will return false")

    return false
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
        console.log("OKAY LETS GO1")

        console.error('No refresh token available')
        logout()
      }
  
      // Use `/refresh_token` endpoint from our Node app
      console.log("OKAY LETS GO")
      const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`)
  
      // Update localStorage values
      window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token)
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())
  
      // Reload the page for localStorage updates to be reflected
      window.location.reload()

      return data; //!
  
    } catch (e) {
      console.error(e)
    }
}

export const logout = () => {
    // Clear all localStorage items
    for(const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property])
    }
    // Navigate to homepage
    window.location = window.location.origin
}

export const accessToken = connect()
// /**
//  * Axios global request headers
//  */
//  axios.defaults.baseURL = 'https://api.spotify.com/v1';
//  axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
//  axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['Allow-Access-Control-Origin'] = '*';

const spotifyAuthService = {
    refreshToken,
    connect,
    hasTokenExpired,
} 

export default spotifyAuthService