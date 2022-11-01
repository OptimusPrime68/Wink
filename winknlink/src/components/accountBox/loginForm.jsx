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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const { switchToForget } = useContext(AccountContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();
    

    console.log(email + password);

    await auth
      .signInWithEmailAndPassword(email, password)
      .then((e) => {

        let userType = "free";
        axios.post("http://localhost:4000/api/is-premium",{email}).then(function(res){
                
        userType = res.data.user;
        });

        axios
          .post("http://localhost:4000/api/login", {
            email,
            password,
          })
          .then(function (response) {
            var id = response.data.id;

            const idTokenResult = e.user._delegate.accessToken;


            

            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: email,
                token: idTokenResult,
                id: id,
                user:userType,
              },
            });
            window.localStorage.setItem("email",email);
            window.localStorage.setItem("token",idTokenResult);
            window.localStorage.setItem("id",id);

            toast.success("Logged In");
            navigate("/wink");
          })
          .catch(function (error) {
            toast.error(error.message);
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error("Log IN ",error);
        console.log(error);

      });

    
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
      <div type="submit" onClick={signIn}>
        Signin
      </div>
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
