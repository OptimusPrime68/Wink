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
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useState } from "react";
import CircleLoader from 'react-spinners/CircleLoader'
import PasswordStrengthBar from 'react-password-strength-bar';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { switchToForget } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [loading,setLoading] = useState(false);
  const [score,setScore] = useState(0);

  
  const signup = async (e) => {
    e.preventDefault();
    console.log(score);

    if(password != passwordMatch)
    {
      toast.warning("Password Does Not Match");
      return;
    }
    else if(score == 0)
    {
      toast.warning("Password is Short")
      return;
    }
    else if(score == 1 || score == 2)
    {
      toast.warning("Use Small Case, Large Case and Specal Symbols")
      return;
    }
   



    setLoading(true);
    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then((e) => {
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("password", password);
        console.log(switchToSignin);
        toast.success("Registration Successful!");
        toast.warn("Verify your mail!", { delay: 3000 });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
      setLoading(false);
  };


  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="password"
        
        onChange={(e)=>setPasswordMatch(e.target.value)}
        placeholder="Confirm Password" />
       
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" onClick={switchToForget}>
        Forget your password?
      </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      {loading && <CircleLoader color="#f70177" />}
      <PasswordStrengthBar password={password} onChangeScore={(e)=>setScore(e)} />
      <SubmitButton type="submit" onClick={signup}>
        SignUp
      </SubmitButton>
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
