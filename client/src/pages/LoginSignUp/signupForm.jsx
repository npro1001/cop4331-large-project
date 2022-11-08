import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SidebSide, SubmitButton } from './common';
import { Marginer } from '../../components/marginer/index.jsx';
import { AccountContext } from "./accountContext";
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

// let userController = require('../../../backend/controllers/userController');
// let duplicateEmail = userController.dupilcateEmail;
// let duplicateUser = userController.duplicateUser;

const Message = styled.div`
    display:inline;
    background:  #391F59;
    color: white;
    position: relative;
`;
const Header = styled.div`
    color: white;
`;
const Crit = styled.p`
    font-size: 12px;
    font-weight: 500;
    padding: 10px;     
    &:invalid{
            color:red;
        }

    &:invalid:before{
    content: "WRONG U DUMBASS";
    }
`;


//signup form
export function SignupForm(props) {
    let passvalid = true;
    let emailvalid = true;
    //when user clicks "login here", form will swtich
    const { switchToLogin } = useContext(AccountContext);

    //! Added by nick
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        confirmemail: '',
        username: '',
        password: '',
        confirmpass: '',
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [confirmPass, setConfirmPass] = useState(true);
    const [confirmEmail, setconfirmEmail] = useState(true);

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
    const { fname,
        lname,
        email,
        confirmemail,
        username,
        password,
        confirmpass } = formData

    const name = fname + " " + lname;

    // Runs initially when LoginForm function is called
    useEffect(() => {
        // Check for error
        if (isError) {
            toast.error(message);
        }

        // If registered or logged in
        if (isSuccess || user) {
            dispatch(reset());
        }
    }, [user, isError, isSuccess, message, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, // "Spead across previous state"
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {

        //TODO DUPLICATE USER ERROR
        e.preventDefault()
        console.log("HANDLING SUBMIT")
        const userData = {
            name,
            email,
            username,
            password
        };

        console.log("CHECKING IF PASSWORDS MATCH")
        if (formData.password !== formData.confirmpass) {
            console.log("PASSWORDS DO NOT MATCH")
            setConfirmPass(false);
            passvalid = false;

        }

        //in the event that user matches the passwords on second try
        else {
            passvalid = true;
        }


        console.log("CHECKING IF EMAIL MATCH")
        if (formData.email !== formData.confirmemail) {
            console.log("EMAILS DO NOT MATCH")
            setconfirmEmail(false);
            emailvalid = false;
        }

        else {
            emailvalid = true;
        }


        if (passvalid && emailvalid) {
            setTimeout(10000);
            console.log("GOOD TO GO :)")
            dispatch(register(userData));
            //reload page to have user sign in
            window.location.reload(false);
        }

        console.log("END OF HANDLING SUBMIT")
    };

    //box container is the entire form
    //marginer creates margins between elements
    return <BoxContainer>
        {/* <script type="text/javascript" src="./formValidation.js">
            console.log("script")
        </script> */}
        <FormContainer onSubmit={handleSubmit}>
            <Marginer direction="vertical" margin={75} />
            <SidebSide>
                <Input name="fname" type="text" placeholder="First Name" onChange={onChange} required />
                <Input name="lname" type="text" placeholder="Last Name" onChange={onChange} required />
            </SidebSide>
            <Marginer direction="vertical" margin={15} />
            <SidebSide>
                <Input name="email" type="email" placeholder="Email" onChange={onChange} required />
                <Input name="confirmemail" type="email" placeholder="Confirm Email" onChange={onChange} required />
            </SidebSide>
            <Marginer direction="vertical" margin={15} />
            <SidebSide>
                <Input name="username" type="text" placeholder="Username" onChange={onChange} required />
                <Input id="password" name="password" type="password" placeholder="Password" onChange={onChange}
                    required />
                <Input name="confirmpass" type="password" placeholder="Confirm Password" onChange={onChange}
                    required />
            </SidebSide>
            <Marginer direction="vertical" margin={15} />
            <span style={{ display: confirmPass ? "none" : "inline-flex", color: "red", alignSelf: "flex-end", margin: "auto" }}>Passwords do not match!</span>
            <span style={{ display: confirmEmail ? "none" : "inline-flex", color: "red", alignSelf: "flex-end", margin: "auto" }}>Emails do not match!</span>
            <Marginer direction="vertical" margin={15} />
            <SubmitButton type="submit"> Register</SubmitButton>
            <Marginer direction="vertical" margin={15} />
            <MutedLink>Not your first rodeo?
                <BoldLink href="#" onClick={switchToLogin}> Login here.</BoldLink>
            </MutedLink>
            <Marginer direction="vertical" margin={15} />

        </FormContainer>
        {/* <Message id="message">
            <Header>Password must contain the following: </Header>
            <Crit id="letter" className="invalid"> A lowercase letter</Crit>
            <Crit id="capital" className="invalid"> A capital letter</Crit>
            <Crit id="number" className="invalid"> A number</Crit>
            <Crit id="length" className="invalid"> A minimum of 8 characters</Crit>
        </Message> */}
        
    </BoxContainer>
} 