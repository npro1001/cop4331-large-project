import axios from 'axios';

const API_URL = '/api/post/';
const USER_API_URL ='/api/users/';

const createPost = async (post) => {
    const response = await axios.post(API_URL, post)
    if(response.data) {
        return response.data;
    }
     return null
}

// Get Following Posts
const getPosts = async(userId) => {
    const response = await axios.get(USER_API_URL + userId + "/getFollowingPosts")
    if (response.data) {
        return response.data
    }
    return null;
}

const likePost = async (postID,userID) => {
    const response = await axios.put(API_URL+"like", postID,userID)
    if(response.data) {
        return response.data;
    }
     return null
}

const postService = {
    createPost,
    getPosts,
    likePost
} 

export default postService