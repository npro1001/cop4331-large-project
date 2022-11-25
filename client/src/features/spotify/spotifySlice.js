import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import spotifyService from './spotifyService'
import axios from 'axios'
import { recommendSongs } from './spotify'


const initialState = {
    token: "",
    isConnected: false,
    message: '',
    isLoading: false,
    // topArtist: '',
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
})

// Get user's top artist
export const getTopArtist = createAsyncThunk('spotify/getTopArtist', async() => {
    return await spotifyService.getTopArtist();
})

//get a user's top genre
export const getTopGenre = createAsyncThunk('spotify/getTopGenre', async() => {
    return await spotifyService.getTopGenre();
})

// // Get array of tracks from search
export const searchTracks = createAsyncThunk('spotify/searchTracks', async(param) => {
    try {        
        console.log(param)
        return await spotifyService.searchTracks(param);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        throw Error({message: message});
    }
})
// export const searchTracks = async (param) => {
//     try {        
//         console.log("PARAM: " + param)
//         return await spotifyService.searchTracks(param);
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
//         throw Error({message: message});
//     }
// }





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
            // state.topArtist = ''
        },
        reconnect: (state) => {
            state.token = localStorage.getItem('spotify_access_token')
            state.isLoading = false
            state.isConnected = true
            state.isError = false
            state.message = ''
            // state.topArtist = ''
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
            if(action.payload != null) {
                state.isConnected = true;
                state.token = action.payload;
            }
            else {
                state.isConnected = false;
                state.isError = true
                state.message = "Error recieving spotify access token"
            }
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
        // Get top artist
        .addCase(getTopArtist.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTopArtist.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Action Payload:  " + action.payload.data.items[0])
            // state.topArtist = action.payload;
        })
        .addCase(getTopArtist.rejected, (state) => {
            state.isLoading = false;
            state.isError = true; //?
            // console.log("Action Payload:  " + action.payload)
            // state.message = action.payload.statusText;
        })
        // Get top genre
        .addCase(getTopGenre.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTopGenre.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Action Payload:  " + action.payload.data.items[0])
            // state.topArtist = action.payload;
        })
        .addCase(getTopGenre.rejected, (state) => {
            state.isLoading = false;
            state.isError = true; //?
            // console.log("Action Payload:  " + action.payload)
            // state.message = action.payload.statusText;
        })
        // Get recommended songs
        .addCase(recommendSongs.pending, (state) => {
            state.isLoading = true
        })
        .addCase(recommendSongs.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Action Payload:  " + action.payload.data.items[0])
            // state.topArtist = action.payload;
        })
        .addCase(recommendSongs.rejected, (state) => {
            state.isLoading = false;
            state.isError = true; //?
            // console.log("Action Payload:  " + action.payload)
            // state.message = action.payload.statusText;
        })

        // // Search tracks
        // .addCase(searchTracks.pending, (state) => {
        //     state.isLoading = true
        // })
        // .addCase(searchTracks.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     console.log("Action Payload:  " + action.payload.data.items[0])
        //     // state.topArtist = action.payload;
        // })
        // .addCase(searchTracks.rejected, (state) => {
        //     state.isLoading = false;
        //     state.isError = true; //?
        //     // console.log("Action Payload:  " + action.payload)
        //     // state.message = action.payload.statusText;
        // })
    }
})

export const { disconnect, reconnect } = spotifySlice.actions
export default spotifySlice.reducer