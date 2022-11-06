import React from "react";
import { useEffect, useState, useContext } from "react";
import Header from "./Header";
import Chat from "./Chat";
import axios from "axios";
import { toast } from "react-toastify";
// import { ChatState } from "./ChatProvider";
import { DateContext } from "./DateContext";
import "../styles/ChatPage.css";
import BottomDrawer from "./BottomDrawer";

const ChatPage = () => {
  const { selectedChat, setSelectedChat, setChats, chats } =
    useContext(DateContext);
  const email = localStorage.getItem("email");

  const senderHandler = (users) => {
    return users[0].email === email ? users[1].email : users[0].email;
  };

  const latestmsgHandler = (msg) => {
    return msg.latestMessage ? msg.latestMessage.content : "Say hi!";
  };
  const latestTimeHadler = (msg) => {
    console.log("change");
    if (msg.latestMessage) {
      var dt = new Date(msg.latestMessage.createdAt);
      return dt.getHours() + ":" + dt.getMinutes();
    } else return "";
  };

  const fetchChats = async () => {
    try {
      // fetch all chats
      axios
        .post("http://localhost:4000/api/chat/all", {
          email: email,
        })
        .then((res) => {
          console.log(res);
          setChats(res.data);
        });
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load Chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    console.log("imside");
    fetchChats();
  }, []);

  return (
    <div>
      <Header />
      <div className="chats">
        {chats.map((chat, i) => (
          <div
            onClick={() => setSelectedChat(chat)}
            style={{ cursor: "pointer" }}
            key={i}
          >
            <Chat
              name={senderHandler(chat.users)}
              message={latestmsgHandler(chat)}
              timestamp={latestTimeHadler(chat)}
              profilePic="/profile.jpg"
            />
          </div>
        ))}
      </div>
      <BottomDrawer />
    </div>
  );
};

export default ChatPage;
