import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
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
export const resetPassword = createAsyncThunk('auth/reset', async(passwordToken, password, thunkAPI) => {
    try {
        return await authService.reset(passwordToken, password)
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
        // Reset state cases
        .addCase(reset.pending, (state) => {
            state.isLoading = true
        })
        .addCase(reset.fulfilled, (state, action) => {
            state.isLoading = false
            state.resetPassword = action.payload //!
        })
        .addCase(reset.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})


export const {reset} = authSlice.actions
export default authSlice.reducer