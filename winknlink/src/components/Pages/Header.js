import React, { useContext } from "react";
import { DateContext } from "./DateContext";
import "../styles/Header.css";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header({ backButton }) {
  const { switchToWink } = useContext(DateContext);
  const { switchToProfile } = useContext(DateContext);
  const { switchToChat } = useContext(DateContext);

  const navigate = useNavigate();

  return (
    <div className="HeaderWink">
      <IconButton onClick={switchToProfile}>
        <PersonIcon fontSize="large" />
      </IconButton>
      <img
        src="/logo.png"
        alt="logo"
        className="headerLogo"
        onClick={switchToWink}
      />
      <IconButton onClick={switchToChat}>
        <ChatIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default Header;
