import React, { useContext,useState } from "react";
import { auth } from "../../firebase";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";
import  {useDispatch} from 'react-redux';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const { switchToForget } = useContext(AccountContext);


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  let dispatch = useDispatch();

  const signIn=async (e)=>{
    e.preventDefault();
      console.log(email + " " + password);
   
      await auth.signInWithEmailAndPassword(email,password).then((e)=>{

       

          axios.post('http://localhost:4000/api/login', {
            email,password
          })
          .then(function (response) {
          var id = response.data.id;
         
          const idTokenResult = (e.user._delegate.accessToken);

          dispatch({
            type:"LOGGED_IN_USER",
            payload:{
              email:email,
              token:idTokenResult,
              id:id
            }
          })

          toast.success("Logged In");
          })
          .catch(function (error) {
            toast.error(error.message);
            console.log(error);
          });


       }).catch((error)=>{
         toast.error(error);
         console.log("me");

       });
  }


  return (
    <BoxContainer>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <FontAwesomeIcon icon={faGoogle} size="2x" />
        <FontAwesomeIcon icon={faTwitter} size="2x" />
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </div>
      <hr
        style={{
          width: "100%",
        }}
      ></hr>
      <p>OR</p>
      <FormContainer>
       
      <Input type="email" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />



      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" onClick={switchToForget}>
        Forget your password?
      </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={signIn}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
