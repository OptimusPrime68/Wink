import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import "../styles/date.css";
import Profile from "./profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Date(props) {
  const [activeTab, setActiveTab] = useState("Wink");

  const switchToWink = () => setActiveTab("Wink");
  const switchToProfile = () => setActiveTab("Profile");
  const switchToMacthes = () => setActiveTab("Matches");
  const switchToChat = () => setActiveTab("Chat");
  const switchToSetting = () => setActiveTab("Setting");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let {user} = useSelector((state)=>({...state}));

  


  useEffect(()=>{
    console.log(user);
    if(user == null) navigate("/");
  })


  const logOut=()=>{
   
    const auth = getAuth();
    signOut(auth).then(() => {

      window.localStorage.removeItem("email");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");

      console.log("hello");
      dispatch({
        type:"LOGOUT",
        payload:null,
      })
      navigate("/");

     
    }).catch((error) => {
      toast.error(error);
    });
      

  }


  return (
    <>
      <div id="dateMainDiv">
        <div id="sideDrawer">
          <div id="headerDrawer" onClick={switchToWink}>
            <div id="userInf">
              <img id="userPic" src="/user.svg" alt="user" />
              <p id="userName">Name</p>
            </div>
          </div>
          <div className="sideBar">
            <Stack gap={3}>
              <Button
                onClick={switchToProfile}
                variant="outline-secondary"
                className="sideButton"
              >
                Profile
              </Button>
              <Button
                onClick={switchToMacthes}
                variant="outline-secondary"
                className="sideButton"
              >
                Matches
              </Button>
              <Button
                onClick={switchToChat}
                variant="outline-secondary"
                className="sideButton"
              >
                Chats
              </Button>
              <Button
                onClick={switchToSetting}
                variant="outline-secondary"
                className="sideButton"
              >
                Settings
              </Button>
              <Button variant="outline-danger" onClick={logOut} >Logout</Button>
              <hr></hr>
              <Button variant="danger">Delete Account</Button>
            </Stack>
          </div>
        </div>
        <div id="dateDiv">
          {activeTab === "Wink" && (
            <div>Page where profile of other users will be displayed</div>
          )}
          {activeTab === "Profile" && <Profile />}
          {activeTab === "Matches" && (
            <div>Page where matches will be displayed</div>
          )}
          {activeTab === "Chat" && <div>chat page</div>}
          {activeTab === "Setting" && <div>setting page</div>}
        </div>
      </div>
      <div id="bottomDrawer">Bottom Drawer</div>
    </>
  );
}
