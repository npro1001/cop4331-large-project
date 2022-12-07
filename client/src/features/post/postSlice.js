import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import { PostsData } from "../../Data/PostsData";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    PostData: PostsData,
    id: user ? user._id : null, // check localStorage
    author: user ? user.name : "",
    post: null,
    isLoading: false,
    isError: false,
    message: "",

}

export const createNewPost = createAsyncThunk('post/createPost', async (post, thunkAPI, token) => {
    try {
        const token = user.token
        return await postService.createPost(post, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const createNewPostWithoutImage = createAsyncThunk('post/createPostWithoutImage', async (post, thunkAPI) => {
    try {
        const token = user.token
        return await postService.createPostWithoutImage(post, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const getPosts = createAsyncThunk('auth/getPosts', async (user, thunkAPI) => {
    try {
        const token = user.token
        return await postService.getPosts(user._id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString());
        return thunkAPI.rejectWithValue(message);
    }
})


export const likePost = createAsyncThunk('post/likePost', async (postID, userID, thunkAPI) => {
    try {
        const token = user.token
        return await postService.likePost(postID,userID, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString());
        return thunkAPI.rejectWithValue(message);
    }
})

const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            // creating new post
            .addCase(createNewPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload != null) {
                    state.PostData.push(action.payload);
                    state.post = action.payload;
                    return state
                }
                else {
                    state.post = null;
                    state.isError = true
                    state.message = "Error uploading post"
                }
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true; //?
                state.message = action.payload;
            })
            // creating new post without image
            .addCase(createNewPostWithoutImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewPostWithoutImage.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload != null) {
                    state.PostData.push(action.payload);
                    state.post = action.payload;
                    return state
                }
                else {
                    state.post = null;
                    state.isError = true
                    state.message = "Error uploading post"
                }
            })
            .addCase(createNewPostWithoutImage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true; //?
                state.message = action.payload;
            })
            // Retrieving user posts
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload != null) {
                    state.PostData.push(action.payload);
                    state.post = action.payload;
                    return state
                }
                else {
                    state.post = null;
                    state.isError = true
                    state.message = "Error uploading post"
                }
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true; //?
                state.message = action.payload;
            })
            
            //liking a post
             .addCase(likePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isLoading = false;
                if (action.payload != null) {
                    state.post = action.payload;
                    return state
                }
                else {
                    state.post = null;
                    state.isError = true
                    state.message = "Error uploading post"
                }
            })
            .addCase(likePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true; //?
                state.message = action.payload;
            })
    }
})


export default postSlice.reducer;