import React from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/landingPage.css";

const RegisterComplete = ({ history }) => {
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const email = window.localStorage.getItem("email");
      const password = window.localStorage.getItem("password");
      const fname = window.localStorage.getItem("fname");
      const lname = window.localStorage.getItem("lname");
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        toast.success("User Saved");
        navigate("/");
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
