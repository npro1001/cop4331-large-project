// For making HTTP request and sending data in localStorage

import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const registerResponse = await axios.post(API_URL, userData)
    if (registerResponse.data) {
        const verifyResponse = await axios.post(API_URL + 'confirm', userData)
        if (verifyResponse.data) {
            // localStorage.setItem('user', JSON.stringify(response.data)) 
            // Idk ab this... should only be in login
            return verifyResponse.data
        }
    }
    return registerResponse.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user - easy way
const logout = () => {
    localStorage.removeItem('user')
}

// Reset user password
const reset = async (passwordToken, password) => {
    const response = await axios.put(API_URL + "reset", passwordToken, password)
    if (response.data) {
        return response.data
    }
    return null;
}

const update = async (name, username, anthemId, anthemTitle, anthemArtist1, anthemImage, anthemUrl, token) => {

    const response = await axios({
        method: 'put',
        url: API_URL + 'update',
        data: name,
        headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data) {

        //! This is potentially dangerous - response is not always good
        // localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
    return null;
}

const getMe = async (token) => {
    const response = await axios({
        method: 'GET',
        url: API_URL + 'me',
        headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data) {

        //! This is potentially dangerous - response is not always good
        // localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    }
    return null;
}

const uploadPFP = async (picture) => {
    const response = await axios.post(API_URL + 'uploadProfilePic', picture)
    console.log({ response });
    if (response.data) {
        return response.data
    }
    return null;
}


//follow user
const follow = async (targetUserId,user) => {

    const response = await axios.put(API_URL +targetUserId+"/follow", {currentUserId: user})
    if (response.data) {
        return response.data
    }
    return null;
}

//unfollow user
const unFollow = async (targetUserId,user) => {

    const response = await axios.put(API_URL +targetUserId+"/unfollow", {currentUserId: user})
    if (response.data) {
        return response.data
    }
    return null;
}

const authService = {
    register,
    login,
    logout,
    reset,
    update,
    getMe,
    uploadPFP,
    follow,
    unFollow
}

export default authService