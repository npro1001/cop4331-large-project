import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import { current } from '@reduxjs/toolkit'


// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

let initialState = {
    user: user ? user : null, // check localStorage
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    resetPassword: ''
}


// async thunk function - deals with async data
// Register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})


// Logout user
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

// async thunk function - deals with async data
// Reset user password
export const userResetPassword = createAsyncThunk('auth/reset', async(passwordObj, thunkAPI) => {
    try {
        return await authService.reset(passwordObj.token, passwordObj.password1)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

//! Update user info
export const updateUser = createAsyncThunk('auth/update', async(name, username, anthemId, anthemTitle, anthemArtist1, anthemImage, anthemUrl, thunkAPI) => {
    console.log("updating user")
    try {
        const token = user.token
        return await authService.update(name, username, anthemId, anthemTitle, anthemArtist1, anthemImage, anthemUrl, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})


export const getMe = createAsyncThunk('auth/getMe', async(thunkAPI) =>
{
    try {
       
        const token = user.token
        return await authService.getMe(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }

})

export const followUser = createAsyncThunk('auth/follow', async(targetUserId, thunkAPI) =>
{
    try {
        return await authService.follow(targetUserId,user._id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }

})

//unfollow
export const unfollowUser = createAsyncThunk('auth/unfollow', async(targetUserId, thunkAPI) =>
{
    try {

        return await authService.unfollow(targetUserId,user._id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }

})

export const uploadPFP = createAsyncThunk('auth/uploadPFP', async(picture, thunkAPI) =>
{
    try {
        return await authService.uploadPFP(picture);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }

})

export const resetPass = createAsyncThunk('auth/passRequest', async(email, thunkAPI) =>
{
    try {
        return await authService.passRequest(email);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }

})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Dispatch this function after we register (reset values)
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.resetPassword = ''
        }
    },
    extraReducers: (builder) => {
        builder
        // Register state cases
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload // THIS GETS SENT CORRECTLY
            state.user = null
        })
        // Login state cases
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload)
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
        // Reset user passowrd state cases
        .addCase(userResetPassword.pending, (state) => {
            state.isLoading = true
        })
        .addCase(userResetPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.resetPassword = action.payload //!
        })
        .addCase(userResetPassword.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        // Update user state cases
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
 
            state.isLoading = false
            state.user = action.payload;
            console.log(action.payload)
            return state
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        // get user state cases
        .addCase(getMe.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
        })
        .addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

         // Login state cases
         .addCase(uploadPFP.pending, (state) => {
            state.isLoading = true
        })
        .addCase(uploadPFP.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log({action})
        })
        .addCase(uploadPFP.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(followUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(followUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            // state.user = action.payload
            console.log(action.payload)
            // return state;
        })
        .addCase(followUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            // state.message = action.payload // THIS GETS SENT CORRECTLY
            console.log("fuck")
        })
        // Unfollow
        .addCase(unfollowUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(unfollowUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            // state.user = action.payload
            console.log(action.payload)
            // return state;
        })
        .addCase(unfollowUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload // THIS GETS SENT CORRECTLY
        })
        // reset password request
        .addCase(resetPass.pending, (state) => {
            state.isLoading = true
        })
        .addCase(resetPass.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(resetPass.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload // THIS GETS SENT CORRECTLY
        }) 
    }
})


export const {reset} = authSlice.actions
export default authSlice.reducer
