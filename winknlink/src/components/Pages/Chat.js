import React, { useContext } from "react";
import { DateContext } from "./DateContext";
import { Avatar } from "@mui/material";
import "../styles/Chat.css";
import Header from "./Header";

function Chat({ name, message, profilePic, timestamp }) {
  const { switchToChatTab } = useContext(DateContext);

  return (
    <div>
      <div className="chat" onClick={switchToChatTab}>
        <Avatar className="chat_image" alt={name} src={profilePic} />
        <div className="chatDetails">
          <h3>{name}</h3>
          <p>{message}</p>
        </div>
        <p className="chatTimestamp">{timestamp}</p>
      </div>
    </div>
  );
}

export default Chat;
