import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom';
// import { spotifyLogout, connect } from '../../features/spotify/spotifySlice'
// import { logout, resetPassword } from '../../features/auth/authSlice'
// import  {toast} from 'react-toastify'
// import axios from "axios";
// import { Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap';
import { BoxContainer, FormContainer, Input, SubmitButton } from '../LoginSignUp/common';
import { Marginer } from '../../components/marginer/index.jsx';
import { Auth, ALogo, backdropVariants } from '../LoginSignUp/index';
import styled from "styled-components";
import Logo from '../../img/logo.png';
import { useParams } from "react-router-dom";
import { userResetPassword } from "../../features/auth/authSlice";
//styling for submit button
export const ResetButton = styled.button`
    width: 20%;
    padding: 11px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: #A170DE;
    align-self: center;
    &:not(:focus):hover {
        filter: brightness(1.2); 
    text-shadow: 0 0 2px #999;
    }
`;

export const NewBackDrop = styled.div`
    width: 120%;
    height: 450px;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: -330px;
    left: -150px;
    border-radius: 0%;
    background: rgba(104,59,159,1);
    background: linear-gradient(270deg, rgba(205,190,224,1) 6%, 
    rgba(161,112,222,1) 29%, rgba(104,59,159,1) 69%, 
    rgba(93,48,149,1) 75%, rgba(57,31,89,1) 96%);

`;

export const PasswordInput = styled.input`
    outline: none;
    width: 20%;
    height: 40px;
    border:none;
    border-radius: 10px;
    padding: 0px 2px;
    border-bottom: 1px solid transparent;
    align-self: center;
    transition: all 100ms ease-in-out;
    font-size: 12px;

    //field will be underlined pink (color can be changed, i just chose pink at random) when selected
    &:focus{
        outline:none;
    }

    &::placeholder{
        color: #000000;
    }

    &:invalid{
        border: 2px solid red;
    }

    &:empty{
        border: none;
    }
`;

export function PasswordReset() {
    const [name, setName] = useState('');
    // const [typePassword, setTypePassword] = useState('password');
    // const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const params = useParams();

    const token = params.token;


    const [message, setMessage] = useState(null);
    const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' });
    const { isLoading, resetPassword, isError } = useSelector((state) => state.auth);
    const { password1, password2 } = passwords
    const [formData, setFormData] = useState({
        newPassword: '',
    })

    const { newPassword } = formData

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // get the name stored in the local storage and ask that user to reset password
    // useEffect(() => {
    // 	const user = localStorage.getItem('user');
    // 	if (user) {
    // 		setName(user.name);
    // 	}
    // }, []);

    useEffect(() => {
        if (resetPassword) {
            navigate('/', { replace: true })
        }
    }, [navigate, resetPassword]);

    // const showHidePassword = (e) => {
    // 	e.preventDefault();
    // 	e.stopPropagation();
    // 	setTypePassword(typePassword === 'password' ? 'text' : 'password');
    // };
    // const showHideConfirmPassword = (e) => {
    // 	e.preventDefault();
    // 	e.stopPropagation();
    // 	setTypeConfirmPassword(
    // 		typeConfirmPassword === 'password' ? 'text' : 'password'
    // 	);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            newPassword
        }


        if (password1 !== password2) {
            setMessage('Passwords do not match. Please retry.');
        } else {
            setMessage(null)
            console.log(password1)

            dispatch(userResetPassword({token,password1}))
                .then((res) => {
                    console.log(res)
                })
        }
    };

    const onChange = (e) => {
        setPasswords((prevState) => ({
            ...prevState, // "Spead across previous state"
            [e.target.name]: e.target.value
            
        }))

        setFormData((prevState) => ({
            ...prevState, // "Spead across previous state"
            [e.target.name]: e.target.value
        }))
    }

    return (

        <Auth>
            <BoxContainer>
                <ALogo src={`${Logo}`} alt="Logo for Anthem which consits of 2 connected quarter notes with sound waves at the top" />
                <NewBackDrop inital={false} variants={backdropVariants} />
                <Marginer direction="vertical" margin={25} />
                <h1>Reset Password</h1>
                <FormContainer onSubmit={handleSubmit}>
                    <Marginer direction="vertical" margin={25} />
                    <PasswordInput type="password" id='password1' name='password1' value={password1} placeholder="New Password" onChange={onChange} required />
                    <Marginer direction="vertical" margin={25} />
                    <PasswordInput type="password" id='password2' name='password2' value={password2} placeholder="Confirm New Password" onChange={onChange} required />
                    <Marginer direction="vertical" margin={25} />
                    <ResetButton type="submit">Submit</ResetButton>
                    <Marginer direction="vertical" margin={15} />
                    <span style={{ display: !message ? "none" : "inline-flex", color: "red", alignSelf: "flex-end", margin: "auto" }}>{message}</span>
                    <Marginer direction="vertical" margin={25} />
                </FormContainer>
            </BoxContainer>
        </Auth>

    );
};

