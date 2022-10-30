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

function App() {
  
  const dispatch = useDispatch();
  let {user} = useSelector((state)=>({...state}));
  
  useEffect(()=>{
         const email = window.localStorage.getItem("email");

         const token = window.localStorage.getItem("token");

         const id = window.localStorage.getItem("id");
        
         if(email && token &&  id){
         dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: email,
            token: token,
            id: id,
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
              <Route path="/photo-upload" element={<Photo />}></Route>
            </Routes>
          </div>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
