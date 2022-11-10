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
//
import Peer from "simple-peer";

const ENDPOINT = "http://localhost:4000";
var socket, selectedChatCompare;
function ChatScreen() {
  const { selectedChat, setSelectedChat, setChats, chats,userDetail } =
    useContext(DateContext);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [emojiObj, setEmojiObj] = useState(null);
  const [emojiBtn, setEmojiBtn] = useState(false);
  const [msgsend, setmsgsend] = useState(false);

  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");

  //video
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [isCalling,setIsCalling] = useState(false);
  const [makeReload, setmakeReload] = useState(false)

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socketNew = useRef();

  useEffect(() => {
    socket = io(ENDPOINT);
    socketNew.current = io.connect("ws://localhost:8000");//new
    // socketNew.current=socket;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })
    socket.emit("setup", id);
    socket.on("connection", () => setSocketConnected(true));

    // //new
    socketNew.current.on("yourID", (id) => {
      setYourID(id);
    })
    socketNew.current.on("allUsers", (users) => {
      setUsers(users);
    })

    socketNew.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, [isCalling,makeReload]);
  //new methods
  function callPeer(id) {
    
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socketNew.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socketNew.current.on("callAccepted", signal => {
      setCallAccepted(true);
      peer.signal(signal);
    })
    setIsCalling(true);

  }
  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socketNew.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    setIsCalling(true);
  }
  let UserVideo;
  if (stream) {
    UserVideo = (
      <video playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <video playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
       
      </div>
    )
  }
//end of new

const [cameraBtn, setcameraBtn] = useState(false);

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
  },[messages]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    console.log("open messages2");
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/chat/message/${selectedChat._id}`
      );
      console.log(data);
      var s = data[0].createdAt;
      var dt = new Date(s);
      console.log(dt.getHours(), dt.getMinutes());
      setMessages(data);
      setLoading(false)

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error.message)
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    scrollToBottom();
    selectedChatCompare = selectedChat;
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
        socket.emit("new message", data);

        setMessages([...messages, data]);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
    scrollToBottom();
    setmsgsend(true)
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
    var s = timestamp?.createdAt;
    var dt = new Date(s);
    return dt.getHours() + ":" + dt.getMinutes();
  };

  const getMatchedHandler = (timestamp) => {
    var s = timestamp?.createdAt;
    var dt = new Date(s);
    return " " + dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear();
  };

  // const profileHandler = (users)=>{
  //   let senderEmail= users[0]?.email === email ? users[1]?.email : users[0]?.email;
  //   console.log(userDetail)
  //   console.log(userDetail.find((element)=>element[0]===senderEmail))
  //   return userDetail.find((element)=>element[0]===senderEmail)[2];
  // }
  // const senderHandler = (users) => {
  //   let senderEmail= users[0]?.email === email ? users[1]?.email : users[0]?.email;
  //   console.log(userDetail)
  //   console.log(userDetail.find((element)=>element[0]===senderEmail))
  //   return userDetail.find((element)=>element[0]===senderEmail)[1];
  // };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const callAllHandler = ()=>{
    Object.keys(users).map(key => {
      if(key!==yourID) callPeer(key)
    })
  }
  const endCallHandler = ()=>{
    setReceivingCall(false);
    setIsCalling(false);
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    setCallAccepted(false);
    setStream(null);
    setmakeReload((prev)=>!prev);
    console.log("inside end call")
  }

  return (
    <div>
      <Header videoButton="/" />
      <HeaderDesktop btn={cameraBtn}/>
      <div className="chatScreen">
        {receivingCall || isCalling  ? (<div>
          {UserVideo}
        {PartnerVideo}
      
        <div>
      {!callAccepted &&  incomingCall 
      // && ( <button onClick={()=>endCallHandler}>Reject</button>)
      }
      {/* {partnerVideo.current?  */}
      <Button onClick={endCallHandler} >End Call</Button>
       {/* :null} */}
       </div>
        </div>):
        <div>
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
                onKeyDown={(e)=>{
                  if(e.key=='Enter') sendMessage();
                }}
              />
              <Button className="ChatScreenButton" onClick={sendMessage}>
                SEND
              </Button>
              <Button className="ChatScreenButton" onClick={callAllHandler}>
                video
              </Button>
            </form>
          </div>
        </div>
      </div>}
      </div>
    </div>
  );
}

export default ChatScreen;