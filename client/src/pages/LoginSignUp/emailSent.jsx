import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import React from "react";
import Logo from '../../img/logo.png';
import { Auth, ALogo, TopContainer, backdropVariants, HeaderContainer, HeaderText, SmallText, InnerContainer, BackDrop} from './index';
import { BoxContainer, SubmitButton } from './common';
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";


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

export function EmailSent(props) {

    const navigate = useNavigate()

    const onClick = (e) => {
        e.preventDefault()
        navigate('/', {replace: true})
    }

    return ( <Auth>
                <BoxContainer>
                        <ALogo src={`${Logo}`} alt="Logo for Anthem which consits of 2 connected quarter notes with sound waves at the top" />
                        <NewBackDrop inital={false} variants={backdropVariants}/>
                        {/* <HeaderContainer> */}
                            <h1>A link was sent to your email address.</h1>
                            <BackToLogin onClick={onClick}>Back to login</BackToLogin>
                        {/* </HeaderContainer> */}
                </BoxContainer>
            </Auth>
    )
}

