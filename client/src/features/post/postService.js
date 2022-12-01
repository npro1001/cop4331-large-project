import axios from 'axios';

const API_URL = '/api/post/';


const createPost = async (post) => {
    const response = await axios.post(API_URL, post)
    if(response.data) {
        return response.data;
    }
     return null
}

const postService = {
    createPost
} 

export default postService