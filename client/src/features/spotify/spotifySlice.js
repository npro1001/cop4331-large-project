import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import spotifyService from './spotifyService'
import axios from 'axios'


const initialState = {
    token: "",
    isConnected: false,
    message: '',
    isLoading: false,
}


// Connect user to spotify
export const connect = createAsyncThunk('spotify/connect', async(thunkAPI) => {
    try {
        return await spotifyService.connect()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Get spotify refresh token
export const refreshSpotifyToken = createAsyncThunk('spotify/refresh_token', async(thunkAPI) => {
    try {
        return await spotifyService.refreshToken()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout spotify
export const spotifyLogout = createAsyncThunk('spotify/logout', async() => {
    return await spotifyService.logout()
    //! RETURN? ****
})




export const spotifySlice = createSlice({
    name: 'spotify',
    initialState,
    reducers: {
        disconnect: (state) => {
            state.token = ""
            state.isLoading = false
            state.isConnected = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        // Connect
        .addCase(connect.pending, (state) => {
            state.isLoading = true
        })
        .addCase(connect.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isConnected = true;
            state.token = action.payload;
        })
        .addCase(connect.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true; //?
            state.message = action.payload;
        })
        // Refresh
        .addCase(refreshSpotifyToken.pending, (state) => {
            state.isLoading = true
        })
        .addCase(refreshSpotifyToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isConnected = true;
            state.token = action.payload; //! I think
        })
        .addCase(refreshSpotifyToken.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true; //?
            state.message = action.payload;
        })
        // Logout
        .addCase(spotifyLogout.pending, (state) => {
            state.isLoading = true
        })
        .addCase(spotifyLogout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isConnected = false;
            state.token = '';
        })
        .addCase(spotifyLogout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true; //?
            state.message = action.payload;
        })
    }
})

export const { disconnect } = spotifySlice.actions
export default spotifySlice.reducer