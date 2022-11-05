import React, { useEffect, useState, useContext } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Wink.css";
import SwipeButtons from "./SwipeButtons";
import axios from "axios";
import { storage } from "../../firebase";
import { getDistance } from 'geolib';
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  list,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircleLoader from 'react-spinners/CircleLoader'
import Header from "./Header";
import { useGeolocated } from "react-geolocated";
import {DateContext} from "./DateContext"


function Wink() {
  const [people, setPeople] = useState([]);
  const [loading,setLoading] = useState(false);
  const { selectedChat,setSelectedChat,setChats,chats } = useContext(DateContext);
  var email = "",dist = 100000000;

  const navigate = useNavigate();
 



  let { user } = useSelector((state) => ({ ...state }));

  if (!user) navigate("/");

  if (user) {email = user.email;  dist = user.distance;}

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });


  


  useEffect(()=>{


 


       setLoading(true);
   
  
      

         axios
          .post("http://localhost:4000/api/all-profile",{email})
          .then(function (response) {
            response.data.forEach(function (x) {

                var y = 0;
                if(coords){
                y = getDistance(
                  { latitude: coords.latitude, longitude: coords.longitude},
                  { latitude: x.location.coordinates[1], longitude: x.location.coordinates[0] }
                )
                }

              

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
                            console.log(y,dist,x.name);
                            if(email != x.email && y <= dist)
                            setPeople((prev)=>[...prev,local]);
                           
                        }
                          
                    })
                })
              })
            });
          }).catch((error)=>toast.warn(error.message));

          setLoading(false);

  },[])


  const swiped = (direction,name,toemail) => {
    console.log(toemail);
    if (direction == "left") {
      toast.success(name + " Removed");
    } else {
      axios
        .post("http://localhost:4000/api/make-match", {
          fromemail: email,
          toemail: toemail,
        })
        .then(function (response) {
          toast.success("Like Sent");
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };


  return (
    <div className="DateMainDiv">
      <Header />
      <div className="ProfieCards">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.email}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name, person.email)}
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
