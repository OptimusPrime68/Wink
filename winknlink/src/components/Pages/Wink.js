import React, { useEffect, useState, useContext, useRef } from "react";
import "../styles/swipeButtons.css";
import Undo from "@mui/icons-material/Replay";
import Like from "@mui/icons-material/Favorite";
import Dislike from "@mui/icons-material/Close";
import TinderCard from "react-tinder-card";
import "../styles/Wink.css";
import SwipeButtons from "./SwipeButtons";
import axios from "axios";
import { storage } from "../../firebase";
import { getDistance } from "geolib";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  list,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";
import { useGeolocated } from "react-geolocated";
import { DateContext } from "./DateContext";
import PersonPinSharpIcon from "@mui/icons-material/PersonPinSharp";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
// import Modal from "react-bootstrap/Modal";
import MatchProfile from "./MatchProfile";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import Loader from "../Pages/Loader";
import Notification from "../Notification";
import {db} from "../../firebase";
import { getDatabase, onValue, set } from "firebase/database";
import BoltIcon from "@mui/icons-material/Bolt";


const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80%",
  overflowX: "hidden",
  overflowY: "scroll",
};

function Wink() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  var swipe = [];

  var email = "",
    dist = 100000000;
  const { selectedChat, setSelectedChat, setChats, chats } =
    useContext(DateContext);
  const navigate = useNavigate();

  let { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  if (!user) navigate("/");

  if (user) {
    email = user.email;
    dist = user.distance;
    swipe = user.user == "free" ? ["up", "down"] : ["down"];
  }

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    setLoading(true);

    axios
      .post("http://localhost:4000/api/all-profile", { email,token:user.token })
      .then(function (response) {
        console.log(response.data)
        response.data.forEach(function ({ x, cpy }) {
          [x, cpy] = [cpy, x];
          var imageListRef = ref(storage, `${x.email}`);

          listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                if (url.includes("profile")) {
                  var local = {
                    name: x.name,
                    gender: x.gender,
                    hobbies: x.hobbies,
                    dob: x.dob,
                    email: x.email,
                    image: url,
                    dist: cpy,
                    id:x._id,
                  };

                  if (email != x.email) setPeople((prev) => [...prev, local]);
                }
              });
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
        toast.warn(error.response.data.message);
      });
  }, []);

  const swiped = (direction, name, toemail,toid) => {
    console.log(toemail);
    if (direction == "down") {
      return;
    } else if (direction == "left") {
      toast.success(name + " Removed");
    } else if (direction == "right") {
      handleRight(email, toemail,toid);
    } else if (direction == "up") {
      handleUp(email, toemail,toid);
    }
  };

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [id, setId] = useState();
  const [open, setOpen] = React.useState(false);
  function handleOpen(e) {
    setId(e);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleRight = async (email, toemail,toid) => {
   

    console.log(toid);   
    axios
      .post("http://localhost:4000/api/make-match", {
        fromemail: email,
        toemail: toemail,
        token:user.token,
      })
      .then(function (response) {
        toast.success("Like Sent");
        Notification(toid,user.name + " Someone Like You");
       
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const handleUp = async (email, toemail,toid) => {
    if (user.user == "free") {
      toast.warn("Purchase Subscription to Send Super Likes");
      return;
    }

    console.log(toid);

    axios
      .post("http://localhost:4000/api/make-super-like", {
        from: email,
        to: toemail,
        token:user.token,
      })
      .then(function (response) {
        toast.success("Super Like Sent");
        Notification(toid,user.name + " Someone Super Like You");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const counter = useRef(0);

  const handleLoad = () => {
    counter.current += 1;
    if (counter.current >= people.length) setLoading(false);
  };


  const left = (e) => {
    setPeople(people.filter((a) => a !== e));
    toast.success(e.name + " Removed");
    console.log("LEFT",e);
  }


  const right = async (e) => {
    await handleRight(email,e.email,e.id);
    setPeople(people.filter((a) => a !== e));
    console.log("RIGHT");
  }

  const up = async (e) => {
    if (user.user == "free") {
      toast.warn("Purchase Subscription to Send Super Likes");
      return;
    }
    await handleUp(email,e.email,e.id)
    setPeople(people.filter((a) => a !== e));
    console.log("UP");
  }

  const undo = async (e) =>{
    
  }



  return (
    <div className="DateMainDiv">
      <Header />
      <div className="ProfieCards">
        {people.map((person) => (
          <>
            <TinderCard
              className="swipe"
              key={person.email}
              preventSwipe={swipe}
              onSwipe={(dir) => swiped(dir, person.name, person.email,person.id)}
            >
              <div
                style={{ backgroundImage: `url(${person.image})` }}
                className="Winkcard"
              >
                <img
                  onLoad={handleLoad}
                  src={person.image}
                  alt="Image"
                  className="TinderImage"
                />
                <h3>
                  {person.name} <br></br>
                  <p style={{ fontSize: "15px", marginTop: "5px" }}>
                    {parseInt(person.dist / 1000) + "KM"}
                  </p>
                </h3>
                <IconButton
                  className="WinkProfileIcon"
                  onClick={() => handleOpen(person.email)}
                >
                  <PersonPinSharpIcon
                    style={{ color: "white" }}
                    fontSize="large"
                  />
                </IconButton>
              </div>
            </TinderCard>
            <div className="swipeButtons">
              <IconButton className="swipeDislike" onClick={()=>left(person)}>
                <Dislike fontSize="large" />
              </IconButton>
              <IconButton className="swipeUndo" onClick={()=>up(person)}>
                <Undo fontSize="large" />
              </IconButton>
              <IconButton className="swipeBolt" onClick={() => up(person)}>
                <BoltIcon fontSize="large" />
              </IconButton>
              <IconButton className="swipeLike" onClick={()=>right(person)}>
                <Like fontSize="large" />
              </IconButton>
            </div>
          </>
        ))}

      
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "10px" }}
      >
        <Box sx={style}>
          <MatchProfile id={id} />
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Box>
      </Modal>
      {loading && <Loader />}
    </div>
  );
}

export default Wink;
