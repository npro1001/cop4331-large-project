import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// https://redux-toolkit.js.org/api/createSlice
import spotifyService from './spotifyService'
import axios from 'axios'

// const accessToken = JSON.parse(localStorage.getItem('accessToken'))
// const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
// const expireTime = JSON.parse(localStorage.getItem('expireTime'))
// const timestamp = JSON.parse(localStorage.getItem('timestamp'))


const initialState = {
    // accessToken: accessToken ? accessToken : null,
    // refreshToken: refreshToken ? refreshToken : null,
    // expireTime: expireTime ? expireTime : null,
    // timestamp: timestamp ? timestamp : null,
    isSuccess: false,
    isConnected: false,
    message: ''
}


// Connect user to spotify
const connect = createAsyncThunk('spotifyAuth/connect', async(thunkAPI) => {
    try {
        // const response = await axios.get("/api/spotify/connect")
        // console.log(response.config.responseUrl)
        // console.log(window.location)
        // window.location = response.config.url
        return await spotifyService.connect()
    } catch (error) {
        console.log("spotify auth slice error on .connect()")
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Connect user to spotify
export const refreshSpotifyToken = createAsyncThunk('spotifyAuth/refresh_token', async(thunkAPI) => {
    try {
        return await spotifyService.refreshToken()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout spotify
export const spotifyLogout = createAsyncThunk('spotify/logout', async() => {
    await spotifyService.logout()
})




export const spotifySlice = createSlice({
    name: 'spotify',
    initialState,
    reducers: {
        // Dispatch this function after we connect to spotify
        resetS: (state) => {
            // state.isLoading = false
            // state.accessToken = accessToken,
            // state.refreshToken = refreshToken,
            // state.expireTime = expireTime,
            // state.timestamp = timestamp,
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
        // connection: (state) => {
        //     // state.accessToken = accessToken,
        //     // state.refreshToken = refreshToken,
        //     // state.expireTime = expireTime,
        //     // state.timestamp = timestamp,
        //     state.isSuccess = true
        //     state.isError = false
        //     state.message = ''
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(connect.fulfilled, (state, action) => {
            state.isSuccess = true
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.expireTime = action.payload.expireTime
            state.timestamp = action.payload.timestamp
        })
        .addCase(connect.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
    }
})


export const { resetS } = spotifySlice.actions
export const accessToken = connect()
export default spotifySlice.reducer