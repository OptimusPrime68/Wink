import React from "react";
import { useEffect, useState, useContext } from "react";
import Header from "./Header";
import Chat from "./Chat";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { DateContext } from "./DateContext";
import "../styles/ChatPage.css";

const ChatPage = () => {
  const { selectedChat, setSelectedChat, setChats, chats,userDetail, setuserDetail } =
    useContext(DateContext);


  const email = localStorage.getItem("email");

  const senderHandler = (users) => {
    let senderEmail= users[0]?.email === email ? users[1]?.email : users[0]?.email;
    // console.log(userDetail)
    let v = userDetail.find((element)=>element[0]===senderEmail);
    console.log(v);
    if(v) return v[1];
    else return "";
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
  const profileHandler = (users)=>{
    let senderEmail= users[0]?.email === email ? users[1]?.email : users[0]?.email;
    // console.log(userDetail)
    let v = userDetail.find((element)=>element[0]===senderEmail);
    if(v && v[2]) return v[2];
    return "";
    
  }

 

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
    fetchChats();
    // console.log(userDetail)
  },[]);

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
