import React, { useEffect, useState, useContext } from "react";
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
import CircleLoader from "react-spinners/CircleLoader";
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
import BottomDrawer from "./BottomDrawer";
import { useDispatch } from "react-redux";
import io from 'socket.io-client'
const ENDPOINT = "http://localhost:4000";
var socket;


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
  socket = io(ENDPOINT);

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
  }


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('match-to',(data)=>{
      console.log(data);
      dispatch({
        type:"NEW_MATCH",
        payload:data,
      })
    })

    console.log("Hello");
  
  })

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
      .post("http://localhost:4000/api/all-profile", { email })
      .then(function (response) {
        response.data.forEach(function (x) {

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
                  };

                  if (email != x.email) 
                  setPeople((prev) => [...prev, local]);

                }
              });
            });
          });
          
          const uniqueNames = Array.from(new Set(people));


        });
      })
      .catch((error) => {
        console.log(error);
        toast.warn(error.response.data.message);
      });

     
 

    setLoading(false);
  }, []);

 

  const swiped = (direction, name, toemail) => {
    console.log(toemail);
    if (direction == "left") {
      toast.success(name + " Removed");
    } else {

    
     
    

      axios
        .post("http://localhost:4000/api/make-match", {
          fromemail: email,
          toemail: toemail,
        })
        .then(function (response) {
          toast.success("Like Sent");
          socket.emit("match",{fromemail:email,toemail:toemail});
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [id,setId] = useState();
  const [open, setOpen] = React.useState(false);
  function handleOpen (e) {
    setId(e)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  console.log(people);

  return (
    <div className="DateMainDiv">
      <Header />
      <div className="ProfieCards">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.email}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name, person.email)}
            onCardLeftScreen={onCardLeftScreen}
          >
            <div
              style={{ backgroundImage: `url(${person.image})` }}
              className="Winkcard"
            >
              <h3>
                {person.name}{" "}
                <IconButton style={{ color: "#fbab7e" }} onClick={()=>handleOpen(person.email)}>
                  <PersonPinSharpIcon fontSize="large" />
                </IconButton>
              </h3>
            </div>
          </TinderCard>
        ))}

        <SwipeButtons />
        {loading && <CircleLoader color="#f70177" />}
      </div>

      <Modal
        open={open}
      
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "10px" }}
      >
        <Box sx={style}>
          <MatchProfile    id={id} />
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Box>
      </Modal>
      <BottomDrawer />
    </div>
  );
}

export default Wink;
