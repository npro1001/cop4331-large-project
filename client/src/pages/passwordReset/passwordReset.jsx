import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react' 
import { useNavigate, Link, Navigate} from 'react-router-dom';
// import { spotifyLogout, connect } from '../../features/spotify/spotifySlice'
// import { logout, resetPassword } from '../../features/auth/authSlice'
// import  {toast} from 'react-toastify'
// import axios from "axios";
// import { Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap';
import { BoxContainer, FormContainer, Input, SubmitButton} from '../LoginSignUp/common';
import { Marginer} from '../../components/marginer/index.jsx';
import { Auth, ALogo, backdropVariants} from '../LoginSignUp/index';
import styled from "styled-components";
import Logo from '../../img/logo.png';

//styling for submit button
export const ResetButton = styled.button`
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

export function PasswordReset({token}) {
	const [name, setName] = useState('');
	// const [typePassword, setTypePassword] = useState('password');
	// const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
	// const [confirmPassword, setConfirmPassword] = useState('');

	const [message, setMessage] = useState(null);
	const [passwords, setPasswords] = useState({password: '', confirmPassword: ''});
	const {isLoading, resetPassword, isError } = useSelector((state) => state.auth);
    const {password1, password2} = passwords
    
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
            navigate('/', {replace: true})
			// setTimeout(() => {
			// 	history.push('/login');
			// }, 10000);
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
		if (passwords.password !== passwords.confirmPassword) {
            setMessage('Passwords do not match. Please retry.');
		} else {
            const passwordToSubmit = passwords.password
			dispatch(resetPassword(token, passwordToSubmit))
            .then(() => {
                navigate("/", {replace: true})
            });
		}
	};

    const onChange = (e) => {
        setPasswords((prevState) => ({
            ...prevState, // "Spead across previous state"
            [e.target.name]: e.target.value
        }))
    }

    return (
        
        <Auth>
            <BoxContainer>
                <ALogo src={`${Logo}`} alt="Logo for Anthem which consits of 2 connected quarter notes with sound waves at the top" />
                <NewBackDrop inital={false} variants={backdropVariants}/>
                    <FormContainer onSubmit={handleSubmit}>
                    <Marginer direction="vertical" margin={75}/>
                    <Input type="password" id='password1' name='password1' value={password1} placeholder="New Password" onChange={onChange} required/>
                    <Marginer direction="vertical" margin={25}/>
                    <Input type="password" id='confirmPassword' name='confirmPassword' value={password2} placeholder="Confirm New Password" onChange={onChange} required/>
                    <Marginer direction="vertical" margin={10}/>
                    <ResetButton type="submit">Submit</ResetButton>
                    <Marginer direction="vertical" margin={15}/>
                    <span style={{ display: !message ? "none" : "inline-flex", color: "red", alignSelf: "flex-end", margin: "auto" }}>{message}</span>
                    <Marginer direction="vertical" margin={25}/>
                    </FormContainer>
            </BoxContainer>
        </Auth>
		// <FormContainer>
		// 	<h1>{name ? `${name}, reset password` : 'Reset Password'}</h1>
		// 	{message && (
		// 		<Message dismissible duration={8} variant='warning'>
		// 			{message}
		// 		</Message>
		// 	)}
		// 	{resetPassword && (
		// 		<Message dismissible variant='success' duration={8}>
		// 			Password Changed Successfully.
		// 		</Message>
		// 	)}
		// 	{error && (
		// 		<Message dismissible variant='danger'>
		// 			{error}
		// 		</Message>
		// 	)}
		// 	{loading ? (
		// 		<Loader />
		// 	) : (
		// 		<Form onSubmit={handleSubmit} style={{ width: '33em' }}>
		// 			<Form.Group className='mb-2'>
		// 				<InputGroup style={{ width: '100%' }}>
		// 					<FloatingLabel
		// 						controlId='passwordinput'
		// 						label='Password'
		// 						className='mb-3'>
		// 						<Form.Control
		// 							size='lg'
		// 							type={typePassword}
		// 							placeholder='Enter your password'
		// 							value={password}
		// 							style={{
		// 								borderRight: 'none',
		// 								width: '205%',
		// 							}}
		// 							onChange={(e) =>
		// 								setPassword(e.target.value)
		// 							}
		// 						/>
		// 					</FloatingLabel>
		// 					<div className='input-group-append'>
		// 						<InputGroup.Text
		// 							onClick={showHidePassword}
		// 							style={{
		// 								paddingLeft: '1em',
		// 								fontSize: '1rem',
		// 								width: '17.5%',
		// 								height: '78%',
		// 								marginLeft: '15rem',
		// 								background: 'transparent',
		// 							}}>
		// 							{typePassword === 'text' ? (
		// 								<i className='far fa-eye-slash' />
		// 							) : (
		// 								<i className='far fa-eye' />
		// 							)}
		// 						</InputGroup.Text>
		// 					</div>
		// 				</InputGroup>
		// 			</Form.Group>
		// 			<Form.Group className='my-2'>
		// 				<InputGroup style={{ width: '100%' }}>
		// 					<FloatingLabel
		// 						controlId='confirmpasswordinput'
		// 						label='Confirm password'
		// 						className='mb-3'>
		// 						<Form.Control
		// 							size='lg'
		// 							type={typeConfirmPassword}
		// 							placeholder='Confirm your password'
		// 							value={confirmPassword}
		// 							style={{
		// 								borderRight: 'none',
		// 								width: '205%',
		// 							}}
		// 							onChange={(e) =>
		// 								setConfirmPassword(e.target.value)
		// 							}
		// 						/>
		// 					</FloatingLabel>
		// 					<div className='input-group-append'>
		// 						<InputGroup.Text
		// 							onClick={showHideConfirmPassword}
		// 							style={{
		// 								paddingLeft: '1em',
		// 								fontSize: '1rem',
		// 								width: '17.5%',
		// 								height: '78%',
		// 								marginLeft: '15rem',
		// 								background: 'transparent',
		// 							}}>
		// 							{typeConfirmPassword === 'text' ? (
		// 								<i className='far fa-eye-slash' />
		// 							) : (
		// 								<i className='far fa-eye' />
		// 							)}
		// 						</InputGroup.Text>
		// 					</div>
		// 				</InputGroup>
		// 			</Form.Group>
		// 			<Button
		// 				type='submit'
		// 				style={{
		// 					padding: '0.5em 1em',
		// 					width: '8rem',
		// 				}}>
		// 				Submit
		// 			</Button>
		// 		</Form>
		// 	)}
		// </FormContainer>
	);
};

