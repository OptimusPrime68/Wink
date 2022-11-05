import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import "../styles/ChatScreen.css";
import { Avatar, Button } from "@mui/material";
import HeaderDesktop from "./HeaderDesktop";
import { DateContext } from "./DateContext";
import { toast } from "react-toastify";
import axios from "axios";
import BottomDrawer from "./BottomDrawer";

function ChatScreen() {
  const { selectedChat, setSelectedChat, setChats, chats } =
    useContext(DateContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");

  const fetchMessages = async () => {
    if (!selectedChat) return;
    console.log("open messages2");
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/chat/message/${selectedChat._id}`
      );
      console.log(data);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    console.log(newMessage);
    if (newMessage) {
      try {
        console.log("sending....");
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:4000/api/chat/message",
          {
            content: newMessage,
            chatId: selectedChat,
            currUser: id,
            email: email,
          }
        );
        console.log(data);

        setMessages([...messages, data]);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator logic
  };

  return (
    <div>
      <Header backButton="/" />
      <HeaderDesktop />
      <div className="chatScreen">
        <p className="chatScreenTimeStamp">
          You matched with Ellen on
          {selectedChat.createdAt}
        </p>
        {messages.map((message) =>
          message.sender.email != email ? (
            <div className="chatScreenMessage">
              <Avatar
                className="chatScreenImage"
                alt={message.name}
                src={message.image}
              />
              <p className="chatScreenText">{message.content}</p>
            </div>
          ) : (
            <div className="chatScreenMessage">
              <p className="chatScreenTextUser">{message.content}</p>
            </div>
          )
        )}

        <form className="ChatScreenInput"
        onSubmit={(e)=> e.preventDefault()}
        // onKeyDown={sendMessage}
        >
          <input
            className="ChatScreenInputField"
            placeholder="Type a message..."
            type="text"
            onChange={typingHandler}
            value={newMessage}
          />
          <Button className="ChatScreenButton" onClick={sendMessage}>
            SEND
          </Button>
        </form>
      </div>
      <BottomDrawer />
    </div>
  );
}

export default ChatScreen;
