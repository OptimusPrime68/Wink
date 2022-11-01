import React from "react";
import Header from "./Header";
import Chat from "./Chat";
import "../styles/ChatPage.css";

const ChatPage = () => {
  return (
    <div>
      <Header />
      <div className="chats">
        <Chat
          name="Manish"
          message="Hey! how are you :)"
          timestamp="35 minutes ago"
          profilePic="/profile.jpg"
        />
        <Chat
          name="Manish"
          message="Hey! how are you :)"
          timestamp="35 minutes ago"
          profilePic="/profile.jpg"
        />
        <Chat
          name="Manish"
          message="Hey! how are you :)"
          timestamp="35 minutes ago"
          profilePic="/profile.jpg"
        />
        <Chat
          name="Manish"
          message="Hey! how are you :)"
          timestamp="35 minutes ago"
          profilePic="/profile.jpg"
        />
      </div>
    </div>
  );
};

export default ChatPage;
