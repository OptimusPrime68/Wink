import React from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterComplete.css";
import { useDispatch } from "react-redux";
import Loader from "../Pages/Loader";
import { getAuth, updatePassword } from "firebase/auth";

const ForgotPassword = ({ history }) => {
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();

        try {
            const email = window.localStorage.getItem("email");
            const password = window.localStorage.getItem("password");

            await auth.signInWithEmailLink(email, window.location.href).then((result) => {

                axios.post("http://localhost:4000/api/forgot-password", { email, password }).then((r) => {


                    if (result.user.emailVerified) {
                        let user = auth.currentUser;
                        user.updatePassword(password);
                        toast.success(r.data.message + "Login Now");
                        navigate("/");
                        window.localStorage.clear();
                    }
                }).catch((err) => {
                    toast.error(err.message);
                    window.localStorage.clear();
                })

            }).catch((err) => {
                window.localStorage.clear();
            })
        }
        catch (err) {
            console.log(err);

            window.localStorage.clear();
            toast.error(err.message);
        }
    }



    return (
        <div id="RegisterPage">
            <div class="Registerbuttons" id="part1">
                <h3 style={{ marginTop: "70px" }}>
                    Click the Update Password button to verify yourself
                </h3>
                <div class="RegisterCompletebutton" onClick={signUp}>
                    <span>Update Password</span>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
