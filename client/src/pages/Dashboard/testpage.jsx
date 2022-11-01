import React from "react";
// import { useContext } from "react";
// import { Marginer} from '../../components/marginer/index.jsx';
// import {useSelector, useDispatch} from 'react-redux'
// import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { BoxContainer } from "../LoginSignUp/common";

export function Testpage() {

    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const onClick = (e) => {
        e.preventDefault()
        navigate('/spotifylogin')
    }

    return (<BoxContainer>
                <h1> Logged in </h1>
                <button onClick={onClick} className='btn btn-block'>Connect to spotify</button>
    </BoxContainer>)
} 
