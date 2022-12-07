import axios from 'axios';

const API_URL = '/api/post/';
const USER_API_URL ='/api/users/';

const createPost = async (post, token) => {
    const response = await axios({
        method: "post",
        url: API_URL, 
        data: post,
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(response.data) {
        return response.data;
    }
     return null
}

const createPostWithoutImage = async (post, token) => {
    const response = await axios({
        method: "post",
        url: API_URL + 'withoutImage', 
        data: post,
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(response.data) {
        return response.data;
    }
     return null
}

// Get Following Posts
const getPosts = async(userId, token) => {
    const response = await axios({
        method: "get",
        url: USER_API_URL + userId + '/getFollowingPosts', 
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if (response.data) {
        return response.data
    }
    return null;
}

const likePost = async (postID, userID, token) => {
    const response = await axios({
        method: "put",
        url: API_URL + userID + '/like', 
        data: {
            postId: postID,
            userId: userID
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(response.data) {
        return response.data;
    }
     return null
}

// Get Following Posts
const deletePostService = async (postId, token) => {
    const response = await axios({
        method: 'put',
        url: API_URL + 'delete', 
        data: {postId: postId},
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if (response.data) {
        console.log(response.data)
        return response.data
    }
    return null;
}

const postService = {
    createPost,
    createPostWithoutImage,
    getPosts,
    likePost,
    deletePostService,
} 

export default postService