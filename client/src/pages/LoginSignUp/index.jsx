// import React from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";
import Logo from '../../img/logo.png';
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import {React, useState} from 'react';


//used styled components for the login/signup
//also used framer-motion to animate the tear drop
//this index.jsx holds the bulk of the code for the webpage
//first portion of this code is css and the latter half is html



//this portion will hold the logo, webname, motto, and form
const Auth = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 4rem;
    position: relative;    
`;

//Aleft will hold the logo, webname, and motto
const Aleft = styled.div`
    position: relative;
    `;

//this is the logo
const ALogo = styled.img`
    position: relative;
    width: 8em;
    height: 7.8rem;
    align-items: center;
    justify-content: center;
    display:flex;
    margin: auto;

`;
//webname
const WebName = styled.h1`
    font-size: 3rem;
    background-color: #391F59;

    background-size: 100%;
    background-repeat: repeat;

    /* set text as mask for bg */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;

`;

//motto
const Motto = styled.h4`
    font-size: .85rem;
    position: relative;
    text-align: center;
    color: black;
`;

//container for the form
const BoxContainer = styled.div`
    width: 400px;
    min-height: 550px;
    display:flex;
    flex-direction: column;
    border-radius:19px;
    background-color:  #391F59;
    filter: drop-shadow(-1px 4px 4px rgba(0, 0, 0, 0.25));
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
    transition: ease-in-out;
    
`;

//top container contains the backdrop and the header container
const TopContainer = styled.div`
    width: 140%;
    height:155px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
    transition: ease-in-out;

`;

//backdrop is the purple teardrop in the form, uses the framer-motion library to animate
const BackDrop = styled(motion.div)`
    width: 140%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: -330px;
    left: -150px;
    border-radius: 50%;
    background: rgba(104,59,159,1);
    background: linear-gradient(270deg, rgba(205,190,224,1) 6%, 
    rgba(161,112,222,1) 29%, rgba(104,59,159,1) 69%, 
    rgba(93,48,149,1) 75%, rgba(57,31,89,1) 96%);

`;

//contains the welcome text at the top of the form
const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    top:90px;
`
//self-explanatory
const HeaderText = styled.h2`
    font-size: 28.6px;
    font-weight: 500;
    line-height: 1.24;
    color: white;
    z-index: 10;
    margin: 0;
    font-family: 'Ubuntu';
`;

//self-explanatory
const SmallText = styled.h5`
    color: white;
    font-size: 13px;
    font-weight: 500;
    z-index: 10;
`;

//contains the input fields and buttons for the login/signup forms
const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;

`;

//this is what allows the teardrop to drop down and go back up again
const backdropVariants = {
    expanded: {
        width:"233%",
        height: "1500px",
        borderRadius: "20%",
    },

    //go back to original position
    collapsed: {
        width: "140%",
        height: "550px",
        borderRadius: "50%",
        top: "-330px",
        left: "-150px",
    },
};

//framer-motion stuff
//a higher stiffness will make the teardrop rebound more when it collapses
const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 35,
};


export function LoginSignUp(props) {

    //the tear drop will start out as collpased, so isExpanded is set to false
    const [isExpanded, setExpanded] = useState(false);

    //user will start at the login page
    const [active, setActive] = useState("login"); 

    //this plays the animation
    const playExpandingAnimation = () =>
    {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration*1000-1500);
    };
    
    //switch to signup form
    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("signup");

        },400 )
    }

    //vice versa
    const switchToLogin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("login");

        },400 )
    }
    const contextValue = {switchToSignup, switchToLogin};

    //now to put it in html
    //note that when defining text, i dont need to put <h1> or <h2> since i already defined it in the css
    //same with div containers (like <Auth> or <BoxContainer>)
    return (
    <AccountContext.Provider value ={contextValue}>
    <Auth>
        <Aleft>
            <ALogo src={`${Logo}`} alt="Logo for Anthem which consits of 2 connected quarter notes with sound waves at the top" />
            <WebName>
                Welcome to Anthem
            </WebName>
            <Motto>Bing Bong</Motto>
        </Aleft>

        <BoxContainer>
            <TopContainer>
                <BackDrop inital = {false} animate={isExpanded ? "expanded" : "collapsed" } 
                variants={backdropVariants} transition={expandingTransition}/>
                {active === "login" && <HeaderContainer>
                    <HeaderText>welcome</HeaderText>
                    <SmallText>login to continue</SmallText>
                </HeaderContainer>}
                {active === "signup" && <HeaderContainer>
                    <HeaderText>new here?</HeaderText>
                    <HeaderText>create an account.</HeaderText>
                    <SmallText>we have cookies!</SmallText>
                </HeaderContainer>}
            </TopContainer>
            <InnerContainer>
                
                {active === "login" && <LoginForm />}
                {active === "signup" && <SignupForm />}
            </InnerContainer>
        </BoxContainer>
    </Auth>
    </AccountContext.Provider>
    )
}
