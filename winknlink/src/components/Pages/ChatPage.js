import React from "react";
import { useEffect, useState, useContext } from "react";
import Header from "./Header";
import Chat from "./Chat";
import axios from "axios";
import { toast } from "react-toastify";
// import { ChatState } from "./ChatProvider";
import { DateContext } from "./DateContext";
import "../styles/ChatPage.css";

const ChatPage = () => {
  const { selectedChat, setSelectedChat, setChats, chats } =
    useContext(DateContext);
  const email = localStorage.getItem("email");

  const senderHandler = (users) => {
    return users[0]?.email === email ? users[1]?.email : users[0]?.email;
  };

  const latestmsgHandler = (msg) => {
    return msg.latestMessage ? msg.latestMessage.content : "Say hi!";
  };
  const latestTimeHadler = (msg) => {
    console.log("change");
    if (msg.latestMessage) {
      var dt = new Date(msg.latestMessage?.createdAt);
      return dt.getHours() + ":" + dt.getMinutes();
    } else return "";
  };

  const fetchChats = async () => {
    try {
      // fetch all chats
      console.log("chats")
      axios
        .post("http://localhost:4000/api/chat/all", {
          email: email,
        })
        .then((res) => {

          console.log(res);
         
         
         
          axios.post("http://localhost:4000/api/fetch-profile",{
            list:res.data,
            email
          }).then((response)=>{


            console.log(response.data);
            setChats(response.data);


          }).



          catch((err)=>{console.log(err)})
          
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
  },[]);

  return (
    <div>
      <Header />
      <div className="chats">
        {chats.map((chat, i) => (
          <div
            onClick={() => setSelectedChat(chat.chat)}
            style={{ cursor: "pointer" }}
            key={i}
          >
            <Chat
              name={(chat.d[0].name)}
              message={latestmsgHandler(chat.chat)}
              timestamp={latestTimeHadler(chat.chat)}
              profilePic={chat.d[0].image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
