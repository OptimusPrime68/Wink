import React from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterComplete.css";
import { useDispatch } from "react-redux";
import Loader from "../Pages/Loader";

const RegisterComplete = ({ history }) => {
  const navigate = useNavigate();

  let dispatch = useDispatch();

  const signUp = async (e) => {
    e.preventDefault();

    try {
      const email = window.localStorage.getItem("email");
      const password = window.localStorage.getItem("password");
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("password");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        axios
          .post("http://localhost:4000/api/signup", {
            email,
            password,
          })
          .then(function (response) {
            var id = response.data.id;

            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: email,
                token: idTokenResult.token,
                id: id,
                user: "free",
              },
            });
            window.localStorage.setItem("token", idTokenResult.token);
            window.localStorage.setItem("id", id);
            toast.success("User Saved");
            if (result.user.emailVerified) {
              let user = auth.currentUser;
              user.updatePassword(password);
              navigate("/wink");
            }
          })
          .catch(function (error) {
            toast.error(error.response.data.Error);
            console.log(error.response.data.Error);
            navigate("/");
          });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response);
    }
  };

  return (
    <div id="RegisterPage">
      <div class="Registerbuttons" id="part1">
        <h3 style={{ marginTop: "70px" }}>
          Click the Sign Up button to verify yourself
        </h3>
        <div class="RegisterCompletebutton" onClick={signUp}>
          <span>Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
