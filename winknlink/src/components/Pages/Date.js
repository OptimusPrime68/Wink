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
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import ForumIcon from "@mui/icons-material/Forum";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import BookIcon from "@mui/icons-material/Book";
import Photo from "./Photo";
import Newsfeed from "./Newsfeed";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Like from "./Like";
import SosIcon from "@mui/icons-material/Sos";

export default function Date(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawerWidth = 240;

  const [activeTab, setActiveTab] = useState("Profile");
  const [page, setPage] = useState("profile");

  const switchToWink = () => {
    setSelectedIndex(7);
    setActiveTab("Wink");
  };
  const switchToProfile = () => {
    setSelectedIndex(0);
    setActiveTab("Profile");
  };
  const switchToMacthes = () => {
    setSelectedIndex(1);
    setActiveTab("Matches");
  };
  const switchToChat = () => {
    setSelectedIndex(2);
    setActiveTab("Chat");
  };
  const switchToSetting = () => {
    setSelectedIndex(3);
    setActiveTab("Setting");
  };
  const switchToChatTab = () => {
    setSelectedIndex(2);
    setActiveTab("ChatTab");
  };
  const switchToDatePlanner = () => {
    setSelectedIndex(4);
    setActiveTab("DatePlanner");
  };
  const switchToNewsfeed = () => {
    setSelectedIndex(6);
    setActiveTab("Newsfeed");
  };
  const switchToLikes = () => {
    setSelectedIndex(5);
    setActiveTab("Likes");
  };

  const [selectedChat, setSelectedChat] = useState();
  const [vdo, setVdo] = useState(false);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const contextValue = {
    switchToWink,
    switchToProfile,
    switchToMacthes,
    switchToChat,
    switchToSetting,
    switchToChatTab,
    switchToDatePlanner,
    switchToNewsfeed,
    switchToLikes,
    activeTab,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { user } = useSelector((state) => ({ ...state }));
  let image = user ? user.image : "";
  let name = user ? user.name : "";

  useEffect(() => {
    if (user == null) navigate("/");
  }, []);

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
        window.localStorage.removeItem("profileId");

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

  const handleAccountDelete = async (e) => {
    toast.warning("We are Deleting Your Account!");

    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("image");

        axios
          .post("http://localhost:4000/api/delete-account", {
            email: user.email,
          })
          .then((e) => {
            dispatch({
              type: "LOGOUT",
              payload: null,
            });
            navigate("/");
          })
          .catch((e) => {
            toast.error(e.data.message);
          });
      })
      .catch((error) => {
        console.log(error);
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
            <Toolbar style={{ backgroundColor: "#fbab7e" }}>
              <IconButton
                selected={selectedIndex === 7}
                onClick={switchToWink}
                className="sideDivHeaderIcon"
              >
                <Typography
                  variant="h6"
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
                <ListItemButton
                  onClick={switchToProfile}
                  selected={selectedIndex === 0}
                >
                  <ListItemIcon>
                    <PersonIcon style={{ color: "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Matches" disablePadding>
                <ListItemButton
                  onClick={switchToMacthes}
                  selected={selectedIndex === 1}
                >
                  <ListItemIcon>
                    <GroupIcon className="matchIconColor" />
                  </ListItemIcon>
                  <ListItemText primary="Matches" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Chats" disablePadding>
                <ListItemButton
                  onClick={switchToChat}
                  selected={selectedIndex === 2}
                >
                  <ListItemIcon>
                    <ForumIcon style={{ color: "#f8de7e" }} />
                  </ListItemIcon>
                  <ListItemText primary="Chats" />
                </ListItemButton>
              </ListItem>
              <ListItem key="DatePlanner" disablePadding>
                <ListItemButton
                  onClick={switchToDatePlanner}
                  selected={selectedIndex === 4}
                >
                  <ListItemIcon>
                    <BookIcon className="DatePlannerIconColor" />
                  </ListItemIcon>
                  <ListItemText primary="Date Planner" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Newdfeed" disablePadding>
                <ListItemButton
                  onClick={switchToLikes}
                  selected={selectedIndex === 5}
                >
                  <ListItemIcon>
                    <ThumbUpIcon className="DatePlannerIconColor" />
                  </ListItemIcon>
                  <ListItemText primary="Likes" />
                </ListItemButton>
              </ListItem>

              <ListItem key="Newdfeed" disablePadding>
                <ListItemButton
                  onClick={switchToNewsfeed}
                  selected={selectedIndex === 6}
                >
                  <ListItemIcon>
                    <NewspaperIcon className="newsFeedIconColor" />
                  </ListItemIcon>
                  <ListItemText primary="News Feed" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Setting" disablePadding>
                <ListItemButton
                  onClick={switchToSetting}
                  selected={selectedIndex === 3}
                >
                  <ListItemIcon>
                    <SettingsIcon style={{ color: "gray" }} />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem key="Logout" disablePadding>
                <ListItemButton onClick={logOut}>
                  <ListItemIcon>
                    <PowerSettingsNewIcon style={{ color: "red" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding style={{ backgroundColor: "red" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <SosIcon style={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="SOS" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem key="Delete" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteIcon style={{ color: "red" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Delete Account"
                    onClick={handleAccountDelete}
                  />
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
            {activeTab === "DatePlanner" && <Photo />}
            {activeTab === "Newsfeed" && <Newsfeed />}
            {activeTab === "Likes" && <Like />}
          </div>
        </DateContext.Provider>
      </div>
    </>
  );
}
