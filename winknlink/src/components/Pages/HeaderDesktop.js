import React, { useContext } from "react";
import { DateContext } from "./DateContext";
import "../styles/Header.css";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

function HeaderDesktop() {
  const { switchToChat } = useContext(DateContext);

  const navigate = useNavigate();

  return (
    <div className="HeaderWinkDesktop">
      <IconButton onClick={switchToChat}>
        <ChatIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default HeaderDesktop;
