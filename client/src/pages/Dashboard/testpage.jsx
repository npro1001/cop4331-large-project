import React from "react";
// import { useContext } from "react";
// import { Marginer} from '../../components/marginer/index.jsx';
import {useSelector, useDispatch} from 'react-redux'
import { useEffect} from 'react' //useState?
import {redirect, useNavigate} from 'react-router-dom';
import { BoxContainer } from "../LoginSignUp/common";
import { connect, resetS } from '../../auth/spotifyAuthSlice'
import { logout, reset } from '../../auth/authSlice'
import  {toast} from 'react-toastify'


export function Testpage() {

    // const [token, setToken] = useState(null)
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

        if (isSuccess || accessToken ) {
            console.log("OKAY")
            dispatch(resetS())
        }
        // setToken(connect)

    }, [message, navigate, dispatch, accessToken, isError, isSuccess, user])


    const onClick = (e) => {
        e.preventDefault()
        // redirect('/api/spotify/connect')
        // fetch('http://localhost:5555/api/spotify/connect')
        // .then(res => res.json())
        // .then(dispatch(connect()))  
        dispatch(connect())
        // setState(accessToken)      
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
            <button href="http://localhost:5555/api/spotify/connect" onClick={onClick} className='btn btn-block'>Connect to spotify</button>
            <button onClick={logout} className='btn btn-block'>Logout</button>
        {/* </>
         ) : ( <> */}
            <h1> Logged in to Anthem and spotify !!!</h1>
            <button onClick={onLogout} className='btn btn-block'>Logout</button>
            {/* <p> Token: {token}</p> */}
         {/* </>)}    */}
    </BoxContainer>)
} 
