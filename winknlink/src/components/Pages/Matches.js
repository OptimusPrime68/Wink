import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Wink.css";
import SwipeButtons from "./SwipeButtons";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import axios from "axios";
import {storage,} from '../../firebase'
import { ref,uploadBytes,listAll,getDownloadURL, list } from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Matches() {
  const [people, setPeople] = useState([]);

  var email="";

  const navigate = useNavigate();

  let { user } = useSelector((state) => ({ ...state }));

  if (!user) navigate("/");

  if (user) email = user.email;


  useEffect(()=>{

         axios
          .post("http://localhost:4000/api/all-match",{email})
          .then(function (response) {

            
            response.data.forEach(function (x) {

                var imageListRef = ref(storage,`${x}`);
              
                listAll(imageListRef).then((response)=>{
                response.items.forEach((item)=>{
                    getDownloadURL(item).then((url)=>{
                        if(url.includes("profile")){

                            var local = {
                                image:url,
                                email:x
                            }
                            console.log(local);
                            setPeople((prev)=>[...prev,local]);
                        }
                    })
                })
              })
            });
          })
          .catch(function (error) {
            console.log(error);
          });

  },[])


  const swiped = (direction,name,toemail) => {
    console.log(toemail);
    if(direction == "up")
    {
              toast.success(name + " Removed");
    }
    else
    {
             toast.success("Open Chat Box");
    }
  }
  

  return (
    <div className="DateMainDiv">
      
      <div className="ProfieCards">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.email}
            preventSwipe={["left", "right"]}
            onSwipe={(dir)=>swiped(dir,person.name,person.email)} 
          
          >
            <div
              style={{ backgroundImage: `url(${person.image})` }}
              className="Winkcard"
            >
              <h3>{person.email}</h3>
            </div>
          </TinderCard>
          
        ))}
      </div>
      <h3>Swipe Down to Chat</h3>
    </div>
  );
}

export default Matches;
