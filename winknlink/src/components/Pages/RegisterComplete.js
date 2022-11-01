import React from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/landingPage.css";
import { useDispatch } from "react-redux";

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
                user:"free",
              },
            });
            window.localStorage.setItem("token",idTokenResult.token);
            window.localStorage.setItem("id",id);

            toast.success("User Saved");
          })
          .catch(function (error) {
            toast.error(error.message);
            console.log(error);
          });


        if (result.user.emailVerified) {;
          let user = auth.currentUser;
          await user.updatePassword(password);
          const idTokenResult = await user.getIdTokenResult();
          navigate("/wink");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <button type="submit" onClick={signUp}>
        Sign Up
      </button>
    </>
  );
};

export default RegisterComplete;
