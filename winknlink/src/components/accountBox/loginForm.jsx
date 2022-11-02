import React, { useContext, useState } from "react";
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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircleLoader from 'react-spinners/CircleLoader'
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const { switchToForget } = useContext(AccountContext);

  const navigate = useNavigate();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  let dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    

    console.log(email + password);

    await auth
      .signInWithEmailAndPassword(email, password)
      .then((e) => {

        let userType = "free";
        let image = "";
        let name = "";
        axios.post("http://localhost:4000/api/is-premium",{email}).then(function(res){
        userType = res.data.user;
        window.localStorage.setItem("user",userType);
        });

        axios.post("http://localhost:4000/api/get-user-profile",{email}).then(function(res){
          
            if(res.data && res.data.name)
            name = res.data.name;
            window.localStorage.setItem("name",name);
        })


       

        axios
          .post("http://localhost:4000/api/login", {
            email,
            password,
          })
          .then(function (response) {
            var id = response.data.id;
            const idTokenResult = e.user._delegate.accessToken;


            console.log("Token",idTokenResult)
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: email,
                token: idTokenResult,
                id: id,
                user:userType,
                name:name,
              },
            });


            window.localStorage.setItem("email",email);
            window.localStorage.setItem("token",idTokenResult);
            window.localStorage.setItem("id",id);

            navigate("/wink");
            toast.success("Welcome");
            
          })
          .catch(function (error) {
            toast.error(error.response.data.Error);
          });
      })
      .catch((error) => {
        toast.error(error.message.slice(10));
      });


     

      setLoading(false);

    
  };

  return (
    <BoxContainer>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faGoogle}
          size="2x"
        />
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faTwitter}
          size="2x"
        />
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faFacebook}
          size="2x"
        />
      </div>
      <hr
        style={{
          width: "100%",
        }}
      ></hr>
      <p>OR</p>
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
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#" onClick={switchToForget}>
        Forget your password?
      </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      {loading && <CircleLoader color="#f70177" />}
      <SubmitButton type="submit" onClick={signIn}>
        Signin
      </SubmitButton>
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
