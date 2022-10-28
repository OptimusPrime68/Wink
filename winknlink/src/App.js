import React from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./components/Pages/RegisterComplete";
import Home from "./components/Pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import DateApp from "./components/Pages/Date";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              path="/register-complete"
              element={<RegisterComplete />}
            ></Route>
            <Route path="/Wink" element={<DateApp />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
