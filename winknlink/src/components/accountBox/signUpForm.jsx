import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import {toast} from 'react-toastify';
import { auth } from "../../firebase";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { switchToForget } = useContext(AccountContext);

  const signup= async (e)=>{
  e.preventDefault();
  var email = "piyushjaiswal956@gmail.com"
  

  const actionCodeSettings = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
    handleCodeInApp: true,
  };
  
  await auth.sendSignInLinkToEmail(email,actionCodeSettings).then((e) => {
  
    window.localStorage.setItem('emailForSignIn', email);
    toast.success("Successfully send");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  });


  }

  return (
    <BoxContainer>
      
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" onClick={switchToForget}>
        Forget your password?
      </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={signup} >SignUp</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
