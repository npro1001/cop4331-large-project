import React from "react";
// import { useContext } from "react";
// import { Marginer} from '../../components/marginer/index.jsx';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react' //useState?
import { useNavigate} from 'react-router-dom';
import { BoxContainer } from "../LoginSignUp/common";
import { connect } from '../../features/spotify/spotifySlice'
import { logout, reset } from '../../features/auth/authSlice'
import  {toast} from 'react-toastify'
// import axios from "axios";
import styled from "styled-components/macro";


export function Testpage() {

    // const [token, setToken] = useState(null)
    // const [spotifyAuthPage, setSpotifyAuthPage] = useState(null)
    const { user } = useSelector((userState) => userState.auth)
    const {accessToken, isError, isSuccess, message} = useSelector((spotifyState) => spotifyState.spotifyAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        // Check for error
        if(isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/')
        }

        // if (isSuccess || accessToken ) {
        //     console.log("OKAY")
        //     dispatch(resetS())
        // }
        // setToken(connect)

    }, [message, navigate, dispatch, accessToken, isError, isSuccess, user])


    // TODO :
    // deal with CORs, figure out response from request, parse accordingly
    // Get page data for "redirect" and get "token information needed for localsotrage"
    // Where does /api/spotify/callback come into play here?
    const onClick = (e) => {
        e.preventDefault()

        // axios.get('/api/spotify/connect') // , {headers: {'Access-Control-Allow-Origin':'*'},})
        // .then(function(response) {
        //     console.log(response)
        //     setSpotifyAuthPage(response.data)
        // }).catch(err => {
        //     console.log(err)
        // })
  
        // window.location = res.url

        //!
        // Can either dispatch the thunkAPI or talk to backend directly
        // Both cause CORS errors
        dispatch(connect())
    }

    const onLogout = () => {
        navigate('/')
        dispatch(logout())
        dispatch(reset())
    }

   

    return (<BoxContainer>
        {/* {!token ? (<> */}
            <h1>Welcome {user && user.name}</h1>
            <h1> Logged in to Anthem </h1>
            <button onClick={onClick} className='btn btn-block'>Connect to spotify</button>
            {/* <a href="http://localhost:5555/api/spotify/connect" target="_self">connect to spotify</a> */}
            <button onClick={logout} className='btn btn-block'>Logout</button>
        {/* </>
         ) : ( <> */}
            <h1> Logged in to Anthem and spotify !!!</h1>
            <button onClick={onLogout} className='btn btn-block'>Logout</button>
            {/* <p> Token: {token}</p> */}
         {/* </>)}    */}
    </BoxContainer>)
} 
