import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SidebSide, SubmitButton} from './common';
import { Marginer } from '../../components/marginer/index.jsx';
import { AccountContext } from "./accountContext";
import { register, reset } from '../../auth/authSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




//signup form
export function SignupForm(props) {
    //when user clicks "login here", form will swtich
    const { switchToLogin } = useContext(AccountContext);

    //! Added by nick
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        confirmEmail: '',
        username: '',
        password: '',
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
    const { fname,
        lname,
        email,
        confirmEmail,
        username,
        password } = formData

    const name = fname + " " + lname;
    
    // Runs initially when LoginForm function is called
    useEffect(() => {
        // Check for error
        if (isError) {
            toast.error(message)
        }

        // If registered or logged in
        if (isSuccess || user) {
            // switchToLogin.click()
            // navigate(switchToLogin.click(), { replace: true })
            dispatch(reset())
        }
    }, [user, isError, isSuccess, message, navigate, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, // "Spead across previous state"
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            name,
            email,
            username,
            password
        }

        dispatch(register(userData))
    }

   


    // const criteria = styled.div`
    //     display:none;
    //     background: #f1f1f1;
    //     color: #000;
    //     position: relative;
    //     padding: 20px;
    //     margin-top: 10px;


    // `

    //box container is the entire form
    //marginer creates margins between elements
    return <BoxContainer>
        <FormContainer onSubmit={handleSubmit} onClick={switchToLogin}>

            <Marginer direction="vertical" margin={75} />
            <SidebSide>
                <Input name="fname" type="text" placeholder="First Name" onChange={onChange} required />
                <Input name="lname" type="text" placeholder="Last Name" onChange={onChange} required />
               
            </SidebSide>
            <Marginer direction="vertical" margin={15} />
            <SidebSide>
                <Input name="email" type="email" placeholder="Email" onChange={onChange} required />
                <Input name="confirmEmail" type="email" placeholder="Confirm Email" onChange={onChange} required />
            </SidebSide>
            <Marginer direction="vertical" margin={15} />
            <SidebSide>
                <Input name="username" type="text" placeholder="Username" onChange={onChange} required />
                <Input name="password" type="password" placeholder="Password" onChange={onChange}
                    required />
            </SidebSide>
            <Marginer direction="vertical" margin={25} />
            <SubmitButton type="submit"> Register</SubmitButton>
            <Marginer direction="vertical" margin={25} />
            <MutedLink>Not your first rodeo?
                <BoldLink href="#" onClick={switchToLogin}> Login here.</BoldLink>
            </MutedLink>
            <Marginer direction="vertical" margin={25} />

        </FormContainer>
    </BoxContainer>
} 