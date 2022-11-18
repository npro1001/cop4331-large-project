// For making HTTP request and sending data in localStorage

import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const registerResponse = await axios.post(API_URL, userData)
    if(registerResponse.data) {
        const verifyResponse = await axios.post(API_URL + 'confirm', userData)
        if(verifyResponse.data) {
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
    if(response.data) {
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
    if(response.data) {
        return response.data
    }
    return null;
}

const authService = {
    register,
    login,
    logout,
    reset,
} 

export default authService