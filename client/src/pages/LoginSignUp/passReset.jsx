import { useSelector, useDispatch } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import React from "react";
import Logo from '../../img/logo.png';
import { Auth, ALogo, TopContainer, backdropVariants, HeaderContainer, HeaderText, SmallText, InnerContainer, BackDrop } from './index';
import { BoxContainer } from './common';
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useState } from 'react';
import { Marginer } from '../../components/marginer';
import { resetPass } from '../../features/auth/authSlice';

export const SidebSide = styled.div`

display:inline-flex;
gap: 1rem;
`;

export const FormContainer = styled.form`
    width:100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    left: 545px;
    position: relative;
    
`;

//styling for submit button
export const BackToLogin = styled.button`
    width: 15%;
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
    height: 550px;
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

const Input = styled.input`
    outline: none;
    width: 25%;
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


const SubmitButton = styled.button`
    width: 15%;
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

export function ResetReq(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);


    const [formData, setFormData] = useState({
        email: '',
    })

    const {
        email
    } = formData

    const onClick = (e) => {
        e.preventDefault()
        navigate('/', { replace: true })
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, // "Spead across previous state"
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
        };

        dispatch(resetPass(userData.email)).then((response) => {
            console.log(response.payload.message)


            if (response.payload.message == `Sent a password reset email to ${userData.email}`) {
                navigate('/verification_sent', { replace: true })
            }

            else {
                setMessage(response.payload.message)
            }

        })
        setTimeout(() => setMessage(false), 3000)

    };

    return (<Auth>
        <BoxContainer>

            <ALogo src={`${Logo}`} alt="Logo for Anthem which consits of 2 connected quarter notes with sound waves at the top" />
            <NewBackDrop inital={false} variants={backdropVariants} />
            <h1>Please enter your email address.</h1>
            <FormContainer onSubmit={handleSubmit}>
                <SidebSide>
                    <Marginer direction="vertical" margin={25} />
                    <Input name="email" type="email" placeholder="Email" onChange={onChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    <Marginer direction="vertical" margin={25} />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </SidebSide>
                <span style={{ display: !message ? "none" : "inline-flex", color: "red", alignSelf: "flex-end", margin: "auto" }}>{message}</span>
            </FormContainer>
            <Marginer direction="vertical" margin={25} />
            <BackToLogin onClick={onClick}>Back to login</BackToLogin>

        </BoxContainer>
    </Auth>
    )
}

