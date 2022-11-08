import React, { useState, useContext, useEffect, useRef } from "react";
import Header from "./Header";
import "../styles/ChatScreen.css";
import { Avatar, Button } from "@mui/material";
import HeaderDesktop from "./HeaderDesktop";
import { DateContext } from "./DateContext";
import { toast } from "react-toastify";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;
function ChatScreen() {
  const { selectedChat, setSelectedChat, setChats, chats } =
    useContext(DateContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [emojiObj, setEmojiObj] = useState(null);
  const [emojiBtn, setEmojiBtn] = useState(false);

  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", id);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageR) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageR.chat._id
      )
        console.log("notify");
      else {
        console.log(newMessageR);
        setMessages([...messages, newMessageR]);
      }
    });
    scrollToBottom();
  });

  const fetchMessages = async () => {
    if (!selectedChat) return;
    console.log("open messages2");
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/chat/message/${selectedChat._id}`
      );
      console.log(data);
      console.log(selectedChat);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    scrollToBottom();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const sendMessage = async (e) => {
    scrollToBottom();
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
        socket.emit("new message", data);

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

  const emojiClickHandler = (emojiObj, event) => {
    setEmojiObj(emojiObj);
    setNewMessage((prev) => prev + emojiObj?.emoji);
  };
  const getTimeHandler = (timestamp) => {
    var s = timestamp.createdAt;
    var dt = new Date(s);
    return dt.getHours() + ":" + dt.getMinutes();
  };

  const getMatchedHandler = (timestamp) => {
    var s = timestamp.createdAt;
    var dt = new Date(s);
    return " " + dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  };

  const otherUserIdHandler = () => {
    // currUser,IdtoCall
    if (selectedChat.users[0].email === email)
      return [selectedChat.users[0]._id, selectedChat.users[1]._id];
    else return [selectedChat.users[1]._id, selectedChat.users[0]._id];
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <Header videoButton="/" />
      <HeaderDesktop users={otherUserIdHandler()} />
      <div className="chatScreen">
        <div className="ChatMessageDiv">
          <p className="chatScreenTimeStamp">
            You matched with Ellen on
            {getMatchedHandler(selectedChat)}
          </p>
          {messages.map((message) =>
            message.sender.email != email ? (
              <div className="chatScreenMessage">
                <Avatar
                  className="chatScreenImage"
                  alt={message.name}
                  src={message.image}
                />
                <p className="chatScreenText">
                  {message.content}
                  <br></br>
                  <span style={{ color: "grey", fontSize: "12px" }}>
                    {getTimeHandler(message)}
                  </span>
                </p>
              </div>
            ) : (
              <div className="chatScreenMessage">
                <p className="chatScreenTextUser">
                  {message.content}
                  <br></br>
                  <span style={{ color: "white", fontSize: "12px" }}>
                    {getTimeHandler(message)}
                  </span>
                </p>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="row MessageDiv">
          <div className="col-auto">
            <div className="emoji">
              <h2
                onClick={() => setEmojiBtn(!emojiBtn)}
                style={{ cursor: "pointer" }}
              >
                &#128512;
              </h2>
              {emojiBtn ? (
                <EmojiPicker
                  onEmojiClick={emojiClickHandler}
                  searchDisabled={true}
                />
              ) : null}
            </div>
          </div>
          <div className="col">
            <form
              className="ChatScreenInput"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="ChatScreenInputField"
                placeholder="Type a message..."
                type="text"
                onChange={typingHandler}
                value={newMessage}
                onKeyPress={handleKeyPress}
              />
              <Button className="ChatScreenButton" onClick={sendMessage}>
                SEND
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
