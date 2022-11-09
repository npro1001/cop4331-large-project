import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react' 
import { useNavigate, Link} from 'react-router-dom';
import { BoxContainer } from "../LoginSignUp/common";
import { spotifyLogout, connect } from '../../features/spotify/spotifySlice'
import { logout, reset } from '../../features/auth/authSlice'
import  {toast} from 'react-toastify'
import axios from "axios";


export function Testpage() {

    const { user } = useSelector((store) => store.auth)
    const { isConnected, isLoading, token, isError, message} = useSelector((store) => store.spotify)
    //! TODO - check for rate limiting error because code is perfect


    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        // Check for error
        if(isError) {
            toast.error(message)
        }

        //!
        // if (!user) {
        //     navigate('/')
        // }
        // dispatch(connect())

    }, [isError, message])

    const onClick = (e) => {
        e.preventDefault() 

        // window.open('http://localhost:5555/api/spotify/connect', '_self');
        // window.location.href = 'http://localhost:5555/api/spotify/connect'

        dispatch(connect())
        .then(() => {
            if(isError) {
                toast.error(message)
            }
        })
        return true
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
        dispatch(spotifyLogout())
        .then(() => {
            window.location.reload()
        })
    }

    if (isLoading) {
        return (<BoxContainer><h1>LOADING ...</h1></BoxContainer>)
    }

    // Onclick triggers first
    // HREF is followed after if onClick returns true
    return (<BoxContainer>
        {!isConnected ? (<>
            <h1>Welcome {user && user.name}</h1>
            <h1> Logged in to Anthem </h1>
            {/* <button onClick={onClick} className='btn btn-block'>Connect to spotify</button> */}
            <a href="http://localhost:5555/api/spotify/connect" target="_self" > 1. PRE Connect to spotify</a>
            <a href="#" target="_self" onClick={onClick}> 2. Connect to spotify </a>
            <button onClick={onLogout} className='btn btn-block'>Logout of Anthem</button>
        </>) : (<>
            <h1> Logged in to Anthem and spotify !!!</h1>
            <button onClick={onSpotifyLogout} className='btn btn-block'>Disconnect Spotify</button>
            <button onClick={onLogout} className='btn btn-block'>Logout of Anthem</button>
            <p> Token: {JSON.stringify(token)}</p>
         </>)}   
    </BoxContainer>)
} 
