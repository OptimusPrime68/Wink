import React, { useContext ,useState} from "react";
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
import PasswordStrengthBar from 'react-password-strength-bar';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import Loader from '../Pages/Loader'




export function ForgetForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const { switchToSignin } = useContext(AccountContext);

  const [loading,setLoading]  = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [score,setScore] = useState(0);

  const forgotPassword = async (e) => {
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
      toast.warning("Use Lower Case, Upper Case and Specal Symbols")
      return;
    }

    setLoading(true);
    const actionCodeSettings = {
      url: "http://localhost:3000/forgot-password",
      handleCodeInApp: true,
    };

    

    await auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then((e) => {
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("password", password);
        toast.success("Email For Verification Sent");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
      });
      
  };



  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <Input type="passwprd" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" onChange={(e)=>setPasswordMatch(e.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={forgotPassword}>Submit</SubmitButton>
      <PasswordStrengthBar password={password} onChangeScore={(e)=>setScore(e)} />
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
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
