import styled from "styled-components";

//contains the form
export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

export const SidebSide = styled.div`
    display:inline-flex;
    flex-direction: row;
    gap: .5em;
`;
export const FormContainer = styled.form`
    width:100%;
    display: flex;
    flex-direction: column;
`;

//this is for "Forgot your passowrd"
export const MutedLink = styled.div`
    font-size: 13px;
    color: #EDEDED;
    font-weight: 500;
    text-decoration: none;
    align-self: center;
`;

//this is for "Login here" and "Signup here"
export const BoldLink = styled.a`
    font-size: 13px;
    color: rgba(205,190,224,1);
    font-weight: 770;
    text-decoration: none;
 
    &:not(:focus):hover {
        filter: brightness(1.2); 
    text-shadow: 0 0 2px #999;
    }

`;

export const Input = styled.input`
    outline: none;
    width: 75%;
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

//styling for submit button
export const SubmitButton = styled.button`
    width: 75%;
    padding: 11px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    background: #CDBEE0;
    border-radius: 15px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(205,190,224);
    align-self: center;
    &:not(:focus):hover {
        filter: brightness(1.2); 
    text-shadow: 0 0 2px #999;
    }
`;