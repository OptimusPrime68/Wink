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

  const fetchChats = async () => {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      // fetch all
      axios.get("http://localhost:4000/api/chat").then((res) => {
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
        <h2>chatIDs</h2>
        {/* {chats.map(val=> <p>{val._id+"----"+val.chatName}</p>)} */}
        {chats.map((chat) => (
          <div onClick={() => setSelectedChat(chat)}>
            <Chat
              name="Manish"
              message="Hey! how are you :)"
              timestamp="35 minutes ago"
              profilePic="/profile.jpg"
            />
          </div>
        ))}

        {/* <Chat
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
        /> */}
      </div>
    </div>
  );
};

export default ChatPage;
