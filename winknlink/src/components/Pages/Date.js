import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import "../styles/date.css";
import Profile from "./profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Setting from "./settings";
import Wink from "./Wink";
import BottomDrawer from "./BottomDrawer";
import Matches from "./Matches";
import { DateContext } from "./DateContext";
import ChatPage from "./ChatPage";
import ChatScreen from "./ChatScreen";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

export default function Date(props) {
  const drawerWidth = 240;

  const [activeTab, setActiveTab] = useState("Profile");

  const switchToWink = () => setActiveTab("Wink");
  const switchToProfile = () => setActiveTab("Profile");
  const switchToMacthes = () => setActiveTab("Matches");
  const switchToChat = () => setActiveTab("Chat");
  const switchToSetting = () => setActiveTab("Setting");
  const switchToChatTab = () => setActiveTab("ChatTab");

  const contextValue = {
    switchToWink,
    switchToProfile,
    switchToMacthes,
    switchToChat,
    switchToSetting,
    switchToChatTab,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { user } = useSelector((state) => ({ ...state }));




  useEffect(() => {
     console.log(user);
     if (user == null) navigate("/");
     
    
     },[]);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");

        console.log("hello");
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <div id="dateMainDiv">
        <div id="sideDrawer">
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>
              <IconButton onClick={switchToWink} className="sideDivHeaderIcon">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  className="sideDivHeader"
                >
                  <Avatar alt="User Profile" src="/profile.jpg" />
                  &nbsp; Name
                </Typography>
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <ListItem key="Profile" disablePadding>
                <ListItemButton onClick={switchToProfile}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Matches" disablePadding>
                <ListItemButton onClick={switchToMacthes}>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Matches" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Chats" disablePadding>
                <ListItemButton onClick={switchToChat}>
                  <ListItemIcon>
                    <ForumIcon />
                  </ListItemIcon>
                  <ListItemText primary="Chats" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Setting" disablePadding>
                <ListItemButton onClick={switchToSetting}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Logout" disablePadding>
                <ListItemButton onClick={logOut}>
                  <ListItemIcon>
                    <PowerSettingsNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem key="Delete" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete Account" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </div>
        <DateContext.Provider value={contextValue}>
          <div id="dateDiv">
            {activeTab === "Wink" && <Wink />}
            {activeTab === "Profile" && <Profile />}
            {activeTab === "Matches" && <Matches />}
            {activeTab === "Chat" && <ChatPage />}
            {activeTab === "Setting" && <Setting />}
            {activeTab === "ChatTab" && <ChatScreen />}
          </div>
        </DateContext.Provider>
      </div>
      <div id="bottomDrawer">
        <BottomDrawer />
      </div>
    </>
  );
}
