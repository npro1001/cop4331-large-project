import React from "react";
// import { useContext } from "react";
// import { Marginer} from '../../components/marginer/index.jsx';
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { BoxContainer } from "../LoginSignUp/common";
import { accessToken } from '../../spotify'
import { logout, reset } from '../../auth/authSlice'


export function Testpage() {

    const [token, setToken] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/')
    //     }

    //     setToken(accessToken)

    //     // return () => {
    //     //     dispatch(reset())
    //     // }
    // }, [user, navigate, accessToken])


    const onClick = (e) => {
        e.preventDefault()
        navigate('/api/spotify/login')
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }


    return (<BoxContainer>
        {/* {!token ? (<> */}
            <h1>Welcome {user && user.name}</h1>
            <h1> Logged in to Anthem </h1>
            <button onClick={onClick} className='btn btn-block'>Connect to spotify</button>
            <button onClick={logout} className='btn btn-block'>Logout</button>
        {/* </> */}
        {/* ) : ( <> */}
            <h1> Logged in to Anthem and spotify !!!</h1>
            <button onClick={onLogout} className='btn btn-block'>Logout</button>
            {/* <p> Token: {token}</p> */}
        {/* </>)}   */}
    </BoxContainer>)
} 
