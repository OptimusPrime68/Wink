import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAZt9Tk7bMqzrDPlI0zfcczgwe8x8LBipQ",
  authDomain: "tinder-clone-d8051.firebaseapp.com",
  databaseURL: "https://tinder-clone-d8051-default-rtdb.firebaseio.com",
  projectId: "tinder-clone-d8051",
  storageBucket: "tinder-clone-d8051.appspot.com",
  messagingSenderId: "766299979329",
  appId: "1:766299979329:web:cc226c5c6d59662e22d0c0",
  measurementId: "G-DRVNG90ZH3"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  // export
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 
  
