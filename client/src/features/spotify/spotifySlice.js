import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import spotifyService from './spotifyService'
import axios from 'axios'


const initialState = {
    // accessToken: accessToken ? accessToken : null,
    // refreshToken: refreshToken ? refreshToken : null,
    // expireTime: expireTime ? expireTime : null,
    // timestamp: timestamp ? timestamp : null,
    token: "",
    isConnected: false,
    message: '',
    isLoading: false,
}


// Connect user to spotify
export const connect = createAsyncThunk('spotify/connect', async(thunkAPI) => {
    console.log("ASD")
    try {
        const response = await spotifyService.connect()
        console.log(JSON.stringify(response))
        return response // note how this response is structured
    } catch (error) {
        console.log("spotify auth slice error on .connect()")
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
    await spotifyService.logout()
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
            console.log(action.payload) //!
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
            console.log(action.payload) //!
            state.isLoading = false;
            state.isConnected = true;
            // state.token = action.payload;
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
    // extraReducers: {
    //     // CONNECT
    //     [connect.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [connect.fulfilled]: (state, action) => {
    //         console.log(action) //!
    //         state.isLoading = false;
    //         state.isConnected = true;
    //         state.token = action.payload;
    //     },
    //     [connect.rejected]: (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true; //?
    //         state.messgae = action.payload;
    //     },
    //     // REFRESH TOKEN
    //     [refreshSpotifyToken.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [refreshSpotifyToken.fulfilled]: (state, action) => {
    //         state.isLoading = false;
    //         state.isConnected = true;
    //         state.authItems[1] = action.payload; // just the refreshToken
    //     },
    //     [refreshSpotifyToken.rejected]: (state, action) => {
    //         state.isLoading = false;
    //         state.isError = true; //?
    //         state.message = action.payload;
    //     },
    //     // LOGOUT
    //     [spotifyLogout.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [spotifyLogout.fulfilled]: (state) => {
    //         state.isLoading = false;
    //         state.isConnected = true;
    //         state.authItems = []; // just the refreshToken
    //     },
    //     [spotifyLogout.rejected]: (state) => {
    //         state.isLoading = false;
    //         state.isError = true; //?
    //     }
    }
})

// export const accessToken = connect()

export const { disconnect } = spotifySlice.actions
export default spotifySlice.reducer