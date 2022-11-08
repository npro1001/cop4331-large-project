import React from "react";
// import { useContext } from "react";
// import { Marginer} from '../../components/marginer/index.jsx';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react' 
import { useNavigate} from 'react-router-dom';
import { BoxContainer } from "../LoginSignUp/common";
import { disconnect, spotifyLogout } from '../../features/spotify/spotifySlice'
import { logout, reset } from '../../features/auth/authSlice'
import  {toast} from 'react-toastify'
// import axios from "axios";
import styled from "styled-components/macro";
import { createNextState } from "@reduxjs/toolkit";


export function Testpage() {

    const [token, setToken] = useState(null)
    const { user } = useSelector((store) => store.auth)
    const { isConnected, isLoading } = useSelector((store) => store.spotify)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        // Check for error
        // if(isError) {
        //     toast.error(message)
        // }

        // if (!user) {
        //     navigate('/')
        // }

        // if (isSuccess || token ) {
        //     setToken(true)
        // }

        

        // setToken(accessToken)

    }, [])


    // TODO :
    // deal with CORs, figure out response from request, parse accordingly
    // Get page data for "redirect" and get "token information needed for localsotrage"
    // Where does /api/spotify/callback come into play here?
    const onClick = (e) => {
        e.preventDefault()

        //!
        // Can either dispatch the thunkAPI or talk to backend directly
        // Both cause CORS errors
        // dispatch(accessToken)
        // setToken(localStorage.getItem('spotify_access_token'))
    }

    const onLogout = () => {
        dispatch(logout())
        .then(() => {
            navigate("/", { replace: true })
          })
        .then(() => {
            dispatch(reset())
        })
    }

    const onSpotifyLogout = () => {
        // dispatch(spotifyLogout())
        // .then(() => {
        //     window.location.reload()
        // })
        dispatch(logout())
        .then(() => {
            window.location.reload()
        })
    }

    // if isLoading

   

    return (<BoxContainer>
        {!isConnected ? (<>
            <h1>Welcome {user && user.name}</h1>
            <h1> Logged in to Anthem </h1>
            {/* <button onClick={onClick} className='btn btn-block'>Connect to spotify</button> */}
            <a href="http://localhost:5555/api/spotify/connect" target="_self">Connect to spotify</a>
            <button onClick={onLogout} className='btn btn-block'>Logout of Anthem</button>
        </>) : (<>
            <h1> Logged in to Anthem and spotify !!!</h1>
            <button onClick={onSpotifyLogout} className='btn btn-block'>Disconnect Spotify</button>
            <button onClick={onLogout} className='btn btn-block'>Logout of Anthem</button>
            <p> Token: {JSON.stringify(token)}</p>
         </>)}   
    </BoxContainer>)
} 
