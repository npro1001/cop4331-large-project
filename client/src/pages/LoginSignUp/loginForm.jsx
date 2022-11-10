import React from "react";
import { useContext } from "react";
import { AccountContext } from "./accountContext";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton} from './common';
import { Marginer} from '../../components/marginer/index.jsx';
import {login, reset} from '../../features/auth/authSlice';
import  {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


//login form
export function LoginForm(props) {
    
    //! Added by nick
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)
    const {username, password} = formData
    
    // Runs initially when LoginForm function is called
    useEffect(() => {
        // Check for error
        if(isError) {
            toast.error(message)
        }

        // If registered or logged in
        if(isSuccess || user) {
            // navigate('/testpage', {replace: true})
            navigate('/home', {replace: true})
            dispatch(reset())
        }
    }, [user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, // "Spead across previous state"
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            username,
            password
        }

        dispatch(login(userData))
    }

    //! --

    //when user clicks "Signup here", the form will switch
    const {switchToSignup } = useContext(AccountContext);

    return ( <BoxContainer>
        <FormContainer onSubmit={onSubmit}>
            <Marginer direction="vertical" margin={75}/>
            <Input type="text" id='username' name='username'value={username} placeholder="Username" onChange={onChange} required/>
            <Marginer direction="vertical" margin={25}/>
            <Input type="password" id='password' name='password' value={password} placeholder="Password" onChange={onChange} required/>
            <Marginer direction="vertical" margin={10}/>
            <MutedLink href="#">Forgot your password?</MutedLink>
            <Marginer direction="vertical" margin={25}/>
            <SubmitButton type="submit"> Login</SubmitButton>
            <Marginer direction="vertical" margin={25}/>
            <MutedLink>New to the club? <BoldLink href="#"  onClick={switchToSignup}>Sign up here.</BoldLink>
            </MutedLink>
        </FormContainer>
    </BoxContainer>)
} 