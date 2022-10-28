import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./components/Pages/RegisterComplete";
import Home from "./components/Pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Photo from "./components/Pages/Photo";
import { Suspense } from "react";
import Date from "./components/Pages/Date";

function App() {
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
