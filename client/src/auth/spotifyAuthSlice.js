import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// https://redux-toolkit.js.org/api/createSlice
import spotifyAuthService from './spotifyAuthService'
import axios from 'axios'

const accessToken = JSON.parse(localStorage.getItem('accessToken'))


const initialState = {
    accessToken: accessToken ? accessToken : null,
    isSuccess: false,
    isConnected: false,
    message: ''
}


// Connect user to spotify
export const connect = createAsyncThunk('spotifyAuth/connect', async(thunkAPI) => {
    try {
        return await spotifyAuthService.connect()
    } catch (error) {
        console.log("spotify auth slice error on .connect()")
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Connect user to spotify
export const refreshToken = createAsyncThunk('spotifyAuth/refresh_token', async(thunkAPI) => {
    try {
        return await spotifyAuthService.refreshToken()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})




export const spotifyAuthSlice = createSlice({
    name: 'spotifyAuth',
    initialState,
    reducers: {
        // Dispatch this function after we connect to spotify
        resetS: (state) => {
            // state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(connect.fulfilled, (state, action) => {
            state.isSuccess = true
            state.accessToken = action.payload
        })
        .addCase(connect.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
    }
})


export const {resetS} = spotifyAuthSlice.actions
export default spotifyAuthSlice.reducer