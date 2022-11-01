import React from "react";
import { useContext } from "react";
import { AccountContext } from "./accountContext";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from './common';
import { Marginer}  from './marginer';

//login form
export function LoginForm(props){

//when user clicks "Signup here", the form will switch
const {switchToSignup } = useContext(AccountContext);

    return<BoxContainer>
        <FormContainer>
            <Marginer direction="vertical" margin={75}/>
            <Input type="text" placeholder="Username"/>
            <Marginer direction="vertical" margin={25}/>
            <Input type="password" placeholder="Password"/>
            <Marginer direction="vertical" margin={10}/>
            <MutedLink href="#">Forgot your password?</MutedLink>
            <Marginer direction="vertical" margin={25}/>
            <SubmitButton type="submit"> Login</SubmitButton>
            <Marginer direction="vertical" margin={25}/>
            <MutedLink>New to the club? <BoldLink href="#"  onClick={switchToSignup}>Sign up here.</BoldLink>
            
            </MutedLink>

        </FormContainer>
    </BoxContainer>
} 