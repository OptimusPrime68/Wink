import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import "../styles/date.css";
import Profile from "./profile";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Setting from "./settings";
import Wink from "./Wink";
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
import { Avatar, Badge, IconButton } from "@mui/material";
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
import { useGeolocated } from "react-geolocated";
import Modal from "react-bootstrap/Modal";
import {db} from "../../firebase";
import { onValue,ref, set } from "firebase/database";
import Notification from "../Notification";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StarIcon from '@mui/icons-material/Star';

export default function Date(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { t } = useTranslation(["home"]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const drawerWidth = 240;

  const [activeTab, setActiveTab] = useState("Profile");
  const [page, setPage] = useState("profile");
  const [not,setNot] = useState([]);

  const [prime, setPrime] = useState(null);

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
  let {matchh} = useSelector((state)=>({...state}));
  let image = user ? user.image : "";
  let name = user ? user.name : "";

  useEffect(() => {
    if (user == null) navigate("/");
  }, []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  console.log(coords);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.localStorage.clear();

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
    const users = auth.currentUser;

    deleteUser(users)
      .then(() => {
        window.localStorage.clear();

        axios
          .post("http://localhost:4000/api/delete-account", {
            email: user.email,
            token: user.token,
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

  const handleSos = async () => {
    if (!isGeolocationAvailable) {
      toast.warn("Enable Location");
      return;
    }

    if (!isGeolocationEnabled) {
      toast.warn("Enable Location");
      return;
    }
    if (!coords) {
      toast.warn("Enable Location");
      return;
    }

    var coordinates = [];
    if (coords) coordinates = [coords.longitude, coords.latitude];

    axios
      .post("http://localhost:4000/api/messages", {
        message: user.name,
        latitude: coordinates[0],
        longitude: coordinates[1],
        to: "+919305250754",
      })
      .then(function (response) {
        toast.success("SMS Sent");
      })
      .catch(function (error) {
        console.log(error.message);
      });

    axios
      .post("http://localhost:4000/api/call", {})
      .then(function (response) {
        toast.success("Call Made");
      })
      .catch(function (error) {
        console.log(error.message);
      });

    console.log("h");
  };

  const [show, setShow] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    try{
      if(user.user=='premium')  setPrime('Prime User')
      console.log("Retrieving Data",user.profile_id);
      onValue(ref(db,user.profile_id),(snapshot)=>{
      const data = snapshot.val();
      console.log(data);
      var cmn = [];
      for(const key in data)
      cmn.push({message:data[key].message,time:data[key].time});
      if(cmn.length == notification.length)
      {
              
      }
      else{
        setNotification(cmn);
      }
    })
  }catch(err){
    console.log(err);
  }

  

  });



  const handleCloseNotify = () => {
    
    set((ref(db,user.profile_id)), null)
    
    setShowNotify(false); 

  }
  const handleShowNotify = () => setShowNotify(true);
  console.log(notification);

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
                  <ListItemText primary="Profile" secondary={prime} />
                </ListItemButton>
              </ListItem>
              <ListItem key="Chats" disablePadding>
                <ListItemButton
                  onClick={switchToChat}
                  selected={selectedIndex === 2}
                >
                  <ListItemIcon>
                    <ForumIcon style={{ color: "#F99D31" }} />
                  </ListItemIcon>
                  <ListItemText primary="Chats" />
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
                <ListItemButton onClick={handleSos}>
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
                  <ListItemText primary="Delete Account" onClick={handleShow} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <Divider />
              <ListItem key="Delete" disablePadding onClick={handleShowNotify}>
                <ListItemButton>
                  <ListItemIcon>
                    <Badge badgeContent={notification.length} color="primary">
                      <NotificationsActiveIcon style={{ color: "#f4c430" }} />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Notification" />
                </ListItemButton>
              </ListItem>
              <Divider />
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
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {t("Are you sure you want to delete your account!")}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button variant="outline-danger" onClick={handleClose}>
            {t("No")}
          </Button>
          <Button variant="outline-success" onClick={handleAccountDelete}>
            {t("Yes")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showNotify}
        onHide={handleCloseNotify}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <List>
            {notification && notification.map((e)=>(
              <>
               <ListItem>
               <ListItemButton>
                 <ListItemText primary={e.message} secondary={e.time} />
               </ListItemButton>
             </ListItem>

           
            <Divider />
            </>
            ))
            }
          </List>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button variant="outline-danger" onClick={handleCloseNotify}>
            {t("Close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
