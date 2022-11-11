import axios from 'axios';

const API_URL = '/api/post/'

//upload image
const uploadImage = async (imageData) => {
    const response = await axios.post(API_URL, imageData)
    if(response.data) {
        return response.data;
    }

    else{
        return null;
    }

}

const postService = {
    uploadImage
} 

export default postService