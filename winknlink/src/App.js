import Pusher from 'pusher-js'
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./components/Pages/RegisterComplete";
import Home from "./components/Pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Photo from "./components/Pages/Photo";
import { Suspense ,useEffect} from "react";
import Date from "./components/Pages/Date";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import Plan from "./components/Pages/Plan";
import io from 'socket.io-client'
import VideoCall from './components/Pages/VideoCall';
const ENDPOINT = "http://localhost:4000";
var socket;


function App() {
  
  const dispatch = useDispatch();
  let {user} = useSelector((state)=>({...state}));

   useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('match-to',(data)=>{
      console.log(data);
    })

    console.log("Hello");
  
  })
  
  useEffect(()=>{
         const email = window.localStorage.getItem("email");

         const token = window.localStorage.getItem("token");

         const id = window.localStorage.getItem("id");

         const user = window.localStorage.getItem("user");
         
         const name = window.localStorage.getItem("name");

         const image = window.localStorage.getItem("image");

         const profileId  = window.localStorage.getItem("profileId");


         var dist = 10000000;

         dist = window.localStorage.getItem("distance");
        
         if(email && token &&  id){
         dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: email,
            token: token,
            id: id,
            user,
            name,
            image,
            distance:dist,
            profile:profileId
          },
        });
      }
  },[])

  return (
    <>
      <Suspense fallback={null}>
        <ToastContainer />
        <Router>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route
                path="/register-complete"
                element={<RegisterComplete />}
              ></Route>
              <Route path="/Wink" element={<Date />}></Route> 
              <Route path="/buy-plan" element={<Plan />}></Route>
              <Route path="/photo-upload" element={<Photo />}></Route>
              <Route path="/chatVideo" element={<VideoCall/>}></Route>

            </Routes>
          </div>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
