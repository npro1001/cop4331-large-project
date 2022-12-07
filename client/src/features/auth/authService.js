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

    let pass = {
        passwordToken: passwordToken,
        password: password
    }
    
    const response = await axios.put(API_URL + "reset", pass)
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

const uploadPFP = async (picture, token) => {
    const response = await axios({
        method: "post",
        url: API_URL + 'uploadProfilePic', 
        data: picture,
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    console.log({ response });
    if (response.data) {
        return response.data
    }
    return null;
}


//follow user
const follow = async (targetUserId,user, token) => {

    const response = await axios({
        method: "put",
        url: API_URL + targetUserId + '/follow', 
        data: {
            currentUserId: user
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if (response.data) {
        return response.data
    }
    return null;
}

const unfollow = async (targetUserId, user, token) => {

    const response = await axios({
        method: "put",
        url: API_URL + targetUserId + '/unfollow', 
        data: {
            currentUserId: user
        },
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if (response.data) {
        return response.data
    }
    return null;
} 

const passRequest = async (email) => {

    console.log(email)
    const response = await axios.post(API_URL + "resetEmail", {email: email})
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
    unfollow,
    passRequest

}

export default authService