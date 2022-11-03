import React, { useState } from "react";
import Header from "./Header";
import "../styles/ChatScreen.css";
import { Avatar, Button } from "@mui/material";
import HeaderDesktop from "./HeaderDesktop";

function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      name: "Ellen",
      image: "/profile.jpg",
      message: "Whats up!",
    },
    {
      name: "Ellen",
      image: "/profile.jpg",
      message: "How is it going!",
    },
    {
      message: "Hi! How are you Ellen!",
    },
  ]);

  return (
    <div>
      <Header backButton="/" />
      <HeaderDesktop />
      <div className="chatScreen">
        <p className="chatScreenTimeStamp">
          You matched with Ellen on 01/08/22
        </p>
        {messages.map((message) =>
          message.name ? (
            <div className="chatScreenMessage">
              <Avatar
                className="chatScreenImage"
                alt={message.name}
                src={message.image}
              />
              <p className="chatScreenText">{message.message}</p>
            </div>
          ) : (
            <div className="chatScreenMessage">
              <p className="chatScreenTextUser">{message.message}</p>
            </div>
          )
        )}

        <form className="ChatScreenInput">
          <input
            className="ChatScreenInputField"
            placeholder="Type a message..."
            type="text"
          />
          <Button className="ChatScreenButton">SEND</Button>
        </form>
      </div>
    </div>
  );
}

export default ChatScreen;
