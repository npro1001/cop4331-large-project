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

export const uploadImage = createAsyncThunk('post/uploadImage', async (imageData, thunkAPI) => {
    try {
        return await postService.uploadImage(imageData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message) || (error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

const postSlice = createSlice({
    name: "post",
    initialState,

    reducers: {
        // imageUpload: (state) => {
        //     state.post = "image";
        // }
    },

    extraReducers: (builder) => {
        builder
            // Connect
            .addCase(uploadImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload != null) {
                    state.PostData.concat(action.payload);
                    state.post = action.payload;

                }
                else {
                    state.post = null;
                    state.isError = true
                    state.message = "Error uploading image"
                }
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true; //?
                state.message = action.payload;
            })
    }
})


export default postSlice.reducer;