import React, { useContext,useEffect,useState } from "react";
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
import { SocketContext } from "./videoContext"

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

function HeaderDesktop() {
  const { switchToChat } = useContext(DateContext);
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call,
  answerCall,me,setName, leaveCall, callUser,setStream } = useContext(SocketContext);

  const [idToCall, setIdToCall] = useState('');
  const navigate = useNavigate();
  const email=localStorage.getItem("email");
  const id=localStorage.getItem("id")

  useEffect(() => {
    setName(email);
    // setIdToCall()
    
  }, [])
  

  const [open, setOpen] = useState(false);
  function handleOpen(e) {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  return (
    <div className="HeaderWinkDesktop">
      <IconButton onClick={handleOpen}>
        <VideocamIcon fontSize="large" />
      </IconButton>
      <IconButton onClick={switchToChat}>
        <ChatIcon fontSize="large" />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "10px" }}
      >
      <Box>
        
        <Box sx={style}>
        <h2>video player</h2>
        {stream && (
            <video playsInline muted ref={myVideo} autoPlay  />
         )}

        {callAccepted && !callEnded && (
              <video playsInline ref={userVideo} autoPlay  />
        )}
        </Box>

        {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
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
