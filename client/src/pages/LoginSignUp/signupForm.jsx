import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SidebSide, SubmitButton } from './common';
import { Marginer } from '../../components/marginer/index.jsx';
import { AccountContext } from "./accountContext";
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// let userController = require('../../../backend/controllers/userController');
// let duplicateEmail = userController.dupilcateEmail;
// let duplicateUser = userController.duplicateUser;


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
    const [dontExist, setDontExist] = useState(true)

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth, shallowEqual)
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
        // if (isError) {
        //     toast.error(message);
        // }

        // If registered or logged in
        if (isSuccess || user) {
            // dispatch(reset());
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

        const userData = {
            name,
            email,
            username,
            password
        };

        if (formData.password !== formData.confirmpass) {
            setConfirmPass(false);
            passvalid = false;
        }
        //in the event that user matches the passwords on second try
        else {
            setConfirmPass(true);
            passvalid = true;
        }
        
        if (formData.email !== formData.confirmemail) {
            setconfirmEmail(false);
            emailvalid = false;
        }
        else {
            setconfirmEmail(true);
            emailvalid = true;
        }

        if(isError) {
            setDontExist(false)
        }
        else {
            setDontExist(true)
        }
        
        if (passvalid && emailvalid) { // && !isError) {
            dispatch(register(userData))
            // window.location.reload(false); // reload page to have user sign in
        }



    };

    //box container is the entire form
    //marginer creates margins between elements
    return <BoxContainer>
        <FormContainer onSubmit={handleSubmit}>
            <Marginer direction="vertical" margin={75} />
            <SidebSide>
                <Input name="fname" type="text" placeholder="First Name" onChange={onChange} required />
                <Input name="lname" type="text" placeholder="Last Name" onChange={onChange} required />
            </SidebSide>
            <Marginer direction="vertical" margin={15} />
            <SidebSide>
                <Input name="email" type="email" placeholder="Email" onChange={onChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                <Input name="confirmemail" type="email" placeholder="Confirm Email" onChange={onChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
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
            <span style={{ display: !isError ? "none" : "inline-flex", color: "red", alignSelf: "flex-end", margin: "auto" }}>{message}</span>
            <Marginer direction="vertical" margin={15} />
            <SubmitButton type="submit"> Register</SubmitButton>
            <Marginer direction="vertical" margin={15} />
            <MutedLink>Not your first rodeo?
                <BoldLink href="#" onClick={switchToLogin}> Login here.</BoldLink>
            </MutedLink>
            <Marginer direction="vertical" margin={15} />

        </FormContainer>        
    </BoxContainer>
} 