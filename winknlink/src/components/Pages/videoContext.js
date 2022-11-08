import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:4000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);



  
  useEffect(() => {
    console.log("calling effect")
    socket.on("me",(id) =>{
        setMe(id)
        console.log(id)
    });
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log("client callUser")
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  },[isCalling]);

  const answerCall = () => {
    setCallAccepted(true);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);
      console.log(currentStream);
      if(userVideo.current){
        userVideo.current.srcObject = currentStream;
        console.log("video working")
      }
    });

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream)
      console.log(currentStream);
      if(myVideo.current){
        myVideo.current.srcObject = currentStream;
        console.log("video working")
      }
    });

    const peer = new Peer({ initiator: true, trickle: false, stream });
    console.log(peer)
    peer.on("signal", (data) => {
      console.log("in signal",id,me)
      setIsCalling(true);
      socket.emit("callUser", { userToCall: id, signalData: data, from: me, name });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
   
  };

  const leaveCall = () => {
    setCallEnded(true);
    stream.getTracks().forEach((track) => {
        track.stop();
      });
    connectionRef.current.destroy();

    // window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      setStream,
      name,
      setName,
      callEnded,
      me,
      setMe,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };