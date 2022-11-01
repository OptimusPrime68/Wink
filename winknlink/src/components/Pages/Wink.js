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
import CircleLoader from 'react-spinners/CircleLoader'

function Wink() {
  const [people, setPeople] = useState([]);
  const [loading,setLoading] = useState(false);

  var email="";

  const navigate = useNavigate();



  let { user } = useSelector((state) => ({ ...state }));

  if (!user) navigate("/");

  if (user) email = user.email;





  useEffect(()=>{


 


       setLoading(true);
   
  
      

         axios
          .post("http://localhost:4000/api/all-profile",{email})
          .then(function (response) {
            response.data.forEach(function (x) {

                var imageListRef = ref(storage,`${x.email}`);
              
                listAll(imageListRef).then((response)=>{
                response.items.forEach((item)=>{
                    getDownloadURL(item).then((url)=>{
                        if(url.includes("profile")){

                            var local = {
                                name:x.name,
                                gender:x.gender,
                                hobbies:x.hobbies,
                                dob:x.dob,
                                email:x.email,
                                image:url
                            }
                            if(email != x.email)
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

          setLoading(false);

  },[])


  const swiped = (direction,name,toemail) => {
    console.log(toemail);
    if(direction == "left")
    {
              toast.success(name + "Removed");
    }
    else
    {


          axios
          .post("http://localhost:4000/api/make-match",{fromemail:email,toemail:toemail})
          .then(function (response) {
           toast.success("Like Sent")
          })
          .catch(function (error) {
            console.log(error.message);
          });
    }
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  console.log(people);

  return (
    <div className="DateMainDiv">
      <div className="HeaderWink">
        <IconButton>
          <PersonIcon fontSize="large" />
        </IconButton>
        <img src="/logo.png" alt="logo" className="headerLogo" />
        <IconButton>
          <ChatIcon fontSize="large" />
        </IconButton>
      </div>
     
      <div className="ProfieCards">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.email}
            preventSwipe={["up", "down"]}
            onSwipe={(dir)=>swiped(dir,person.name,person.email)} 
            onCardLeftScreen={onCardLeftScreen}
          >
            <div
              style={{ backgroundImage: `url(${person.image})` }}
              className="Winkcard"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
         
         
        <SwipeButtons />
        {loading && <CircleLoader color="#f70177" />}
      </div>
    </div>
  );
}

export default Wink;
