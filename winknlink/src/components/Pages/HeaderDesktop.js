import React, { useContext } from "react";
import { DateContext } from "./DateContext";
import "../styles/Header.css";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function HeaderDesktop({ btn }) {
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
