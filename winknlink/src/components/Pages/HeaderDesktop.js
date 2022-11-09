import React, { useContext } from "react";
import { DateContext } from "./DateContext";
import "../styles/Header.css";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import VideocamIcon from '@mui/icons-material/Videocam';

function HeaderDesktop({btn}) {
  const { switchToChat } = useContext(DateContext);

  const navigate = useNavigate();

  return (
    <div className="HeaderWinkDesktop">
      <IconButton onClick={switchToChat}>
        <ChatIcon fontSize="large" />
      </IconButton>
      {/* <Link to='/chatVideo'> */}
        <IconButton>
          <VideocamIcon fontSize="large" />
        </IconButton>
      {/* </Link> */}
      
    </div>
  );
}

export default HeaderDesktop;