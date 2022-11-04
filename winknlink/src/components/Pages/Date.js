import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import "../styles/date.css";
import Profile from "./profile";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Setting from "./settings";
import Wink from "./Wink";
import BottomDrawer from "./BottomDrawer";
import Matches from "./Matches";
import { DateContext } from "./DateContext";
import ChatPage from "./ChatPage";
import ChatScreen from "./ChatScreen";
import { getAuth, deleteUser } from "firebase/auth";
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
import axios from "axios";

export default function Date(props) {
  const drawerWidth = 240;

  const [activeTab, setActiveTab] = useState("Profile");

  const switchToWink = () => setActiveTab("Wink");
  const switchToProfile = () => setActiveTab("Profile");
  const switchToMacthes = () => setActiveTab("Matches");
  const switchToChat = () => setActiveTab("Chat");
  const switchToSetting = () => setActiveTab("Setting");
  const switchToChatTab = () => setActiveTab("ChatTab");

 
  const [selectedChat, setSelectedChat] = useState();
  const [vdo,setVdo] = useState(false);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  
  const contextValue = {
    switchToWink,
    switchToProfile,
    switchToMacthes,
    switchToChat,
    switchToSetting,
    switchToChatTab,
    
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
       
       
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { user } = useSelector((state) => ({ ...state }));
  let image = user ? user.image:"";
  let name = user?user.name:"";




  useEffect(() => {
     if (user == null) navigate("/");
     
    
     },[]);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("image");
        window.localStorage.removeItem("user");

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


  const handleAccountDelete =async (e)=>{
    
    toast.warning("We are Deleting Your Account!")


    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("image");
      axios.post("http://localhost:4000/api/delete-account",{email:user.email}).then((e)=>{

        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/");
        
        }).catch((e)=>{
    
          toast.error(e.data.message);
        })
    }).catch((error) => {
      console.log(error);
      toast.error(error);
    });




    

  }

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
                  <Avatar alt="User Profile" src={image} />
                  &nbsp; {name}
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
                  <ListItemText primary="Delete Account" onClick={handleAccountDelete} />
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
