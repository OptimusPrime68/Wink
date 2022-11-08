import React, { useContext, useEffect, useState } from "react";
import { DateContext } from "./DateContext";
import "../styles/Header.css";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SocketContext } from "./videoContext";

const style = {
  position: "relative",
  Width: "100vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  Height: "100vh",
  overflowX: "hidden",
  overflowY: "scroll",
};

function HeaderDesktop({users}) {
  const { switchToChat } = useContext(DateContext);
<<<<<<< HEAD
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call,
  answerCall,me,setMe,setName, leaveCall, callUser,setStream } = useContext(SocketContext);
=======
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    answerCall,
    me,
    setName,
    leaveCall,
    callUser,
    setStream,
  } = useContext(SocketContext);
>>>>>>> ef347228d9a0077940dcb49438edd07da47143d8

  const [idToCall, setIdToCall] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("id");

  useEffect(() => { 
    setName(email);
<<<<<<< HEAD
    // console.log(users)
    setIdToCall(users[1])
    // setMe(users[0])
  }, [])
  
=======
    // setIdToCall()
  }, []);
>>>>>>> ef347228d9a0077940dcb49438edd07da47143d8

  const [open, setOpen] = useState(false);
  function handleOpen(e) {
    callUser(idToCall);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  
  return (
    <div className="HeaderWinkDesktop">
      <div className="row ">
        <div className="col">
          <IconButton onClick={switchToChat} style={{ color: "#f8de7e" }}>
            <ChatIcon fontSize="large" />
          </IconButton>
        </div>
        <div className="col-auto">
          <IconButton
            onClick={handleOpen}
            style={{ float: "right", color: "#d0f0c0" }}
          >
            <VideocamIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "10px" }}
      >
<<<<<<< HEAD
      <Box>
        
        <Box sx={style}>
        <h2>video player</h2>
        
            <video playsInline muted ref={myVideo} autoPlay  />
        
=======
        <Box>
          <Box sx={style}>
            <h2>video player</h2>
            {stream && <video playsInline muted ref={myVideo} autoPlay />}
>>>>>>> ef347228d9a0077940dcb49438edd07da47143d8

            {callAccepted && !callEnded && (
              <video playsInline ref={userVideo} autoPlay />
            )}
          </Box>

          {call.isReceivingCall && !callAccepted && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>{call.name} is calling:</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default HeaderDesktop;
