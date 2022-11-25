import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// API URL
const API_URL = 'api/spotify'

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

// /**
//  * HAandles logic for retrieving the Spotify access token from localStorage
//  * or URL query params
//  * @returns {string} A spotify access token
//  */
// const getAccessToken = () => {
//     const queryString = window.location.search
//     const urlParams = new URLSearchParams(queryString)
//     const queryParams = {
//         [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
//         [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
//         [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
//     }
//     const hasError = urlParams.get('error')
    
//     // If theres an error OR the token has expired => refresh token
//     if(hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
//       refreshToken()
//     }
    
//     // If theres a valid access token, use that
//     if(LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
//         return LOCALSTORAGE_VALUES.accessToken
//     }
    
    
//     // If there is a token in the URL query params, user is logging in for the first time
//     if(queryParams[LOCALSTORAGE_KEYS.accessToken]) {
//         // Store the query params in localStorage
//         for (const property in queryParams) {
//             window.localStorage.setItem(property, queryParams[property])
//         }
//         // Set timestamp
//         window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

//         // Return access token from query params
//         return queryParams[LOCALSTORAGE_KEYS.accessToken]
//     }

//     return false
// }

// /**
//  * Checks if the amount of time that has elapsed between the timestamp in localStorage
//  * and now is greater than the expiration time of 3600 seconds (1 hour).
//  * @returns {boolean} Whether or not the access token in localStorage has expired
//  */
// const hasTokenExpired = () => {
//     const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES
//     if (!accessToken || !timestamp) {
//       return false
//     }
//     const millisecondsElapsed = Date.now() - Number(timestamp)
//     return (millisecondsElapsed / 1000) > Number(expireTime)
// }

// /**
//  * Use the refresh token in localStorage to hit the /refresh_token endpoint
//  * in our Node app, then update values in localStorage with data from response.
//  * @returns {void}
//  */
// const refreshToken = async () => {
//     try {
//       // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
//       if (!LOCALSTORAGE_VALUES.refreshToken ||
//         LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
//         (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000
//       ) {
//         console.error('No refresh token available')       
//         logout()
//       }
//       console.log("here") //! ******


//       // Use `/refresh_token` endpoint from our Node app
//       const { data } = await axios.get(`${API_URL}/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`)

//       // Update localStorage values
//       window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token)
//       window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())
  
//       // Reload the page for localStorage updates to be reflected
//       window.location.reload()
  
//     } catch (e) {
//       console.error(e)
//     }
// }


// /**
//  * Get Current User's Profile
//  * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
//  * @returns {Promise}
//  */
// export const getCurrentUserProfile = () => axios.get('/me');

// /**
//  * Get a List of Current User's Playlists
//  * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
//  * @returns {Promise}
//  */
// export const getCurrentUserPlaylists = (limit = 20) => {
//     return axios.get(`/me/playlists?limit=${limit}`);
//   };

/**
 * Get a User's Top Artists and Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getTopArtists = async (time_range = 'short_term') => {
    const response = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}`,
        headers: {
            'Content-type':'application/json',
            'Authorization':`Bearer ${LOCALSTORAGE_VALUES.accessToken}`
        }
    });
    console.log(response);
    return response;
  };

  //get a user's top genre
 export const getTopGenre = async (time_range = 'short_term') => {
     const response = await axios({
         method: 'get',
         url: `https://api.spotify.com/v1/me/top/genre?time_range=${time_range}`,
         headers: {
             'Content-type':'application/json',
             'Authorization':`Bearer ${LOCALSTORAGE_VALUES.accessToken}`
         }
     });
     console.log(response);
     return response;
   };


   //get recommended songs/artists?
   export const recommendSongs = async (token, user) => {
        const response = await axios({
            method: 'get',
            url: `${API}/user/${user._id}/recommendations`,//might be wrong
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Authorization': `Bearer ${LOCALSTORAGE_VALUES.accessToken}`
            }
        });
		console.log(response);
		return response;
    };

  
// // @desc    Get user's top artist
// // @route   GET /api/spotify/top_artist
// // @access  Private
// export const getTopArtist = async () => {

//     try{
//         const response = await axios({
//             method: 'get',
//             url: `https://api.spotify.com/v1/me/top/artists?limit=1`,
//             headers: {
//                 'Content-type':'application/json',
//                 'Authorization':`Bearer ${LOCALSTORAGE_VALUES.accessToken}`
//             }
//         })
//         // console.log(response);
//         // console.log(response.items[0]);
//         if(response) return response;
//     } catch (error) {
//         console.error(error)
//     }
// }

// /**
//  * Get a User's Top Tracks
//  * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
//  * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
//  * @returns {Promise}
//  */
// export const getTopTracks = (time_range = 'short_term') => {
//     return axios.get(`/me/top/tracks?time_range=${time_range}`);
//   };

// export const logout = () => {
//     // Clear all localStorage items
//     for(const property in LOCALSTORAGE_KEYS) {
//         window.localStorage.removeItem(LOCALSTORAGE_KEYS[property])
//     }
//     // Navigate to homepage
//     window.location = window.location.origin
// }

// export const accessToken = getAccessToken()


// /**
//      * Axios global request headers
//      */
//     axios.defaults.baseURL = 'https://api.spotify.com/v1';
//     axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
//     axios.defaults.headers['Content-Type'] = 'application/json';