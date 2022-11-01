import React, { useContext} from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from './common';
import { Marginer} from '../../components/marginer/index.jsx';
import { AccountContext } from "./accountContext";

//signup form
export function SignupForm(props)
{
    //when user clicks "login here", form will swtich
    const {switchToLogin } = useContext(AccountContext);

    //box container is the entire form
    //marginer creates margins between elements
    return<BoxContainer>
        <FormContainer>
            <Marginer direction="vertical" margin={75}/>
            <Input type="text" placeholder="First Name"/>
            <Marginer direction="vertical" margin={15}/>
            <Input type="text" placeholder="Last Name"/>
            <Marginer direction="vertical" margin={15}/>
            <Input type="email" placeholder="Email"/>
            <Marginer direction="vertical" margin={15}/>
            <Input type="email" placeholder="Confirm Email"/>
            <Marginer direction="vertical" margin={15}/>
            <Input type="text" placeholder="Username"/>
            <Marginer direction="vertical" margin={15}/>
            <Input type="password" placeholder="Password"/>
            <Marginer direction="vertical" margin={25}/>
            <Marginer direction="vertical" margin={10}/>
            <Marginer direction="vertical" margin={25}/>
            <SubmitButton type="submit"> Register</SubmitButton>
            <Marginer direction="vertical" margin={25}/>
            <MutedLink>Not your first rodeo? 
            <BoldLink href="#" onClick={switchToLogin}> Login here.</BoldLink>
            </MutedLink>
            <Marginer direction="vertical" margin={25}/>

        </FormContainer>
    </BoxContainer>
} 