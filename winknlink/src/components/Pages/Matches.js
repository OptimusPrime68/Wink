import React, { useEffect, useState, useContext, useRef } from "react";
import "../styles/Wink.css";
import axios from "axios";
import { storage } from "../../firebase";
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
import Loader from "./Loader";
import Header from "./Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardMedia } from "@mui/material";
import { DateContext } from "./DateContext";
import * as Realm from 'realm-web'
import "../styles/Matches.css";
import { exists } from "i18next";


function Matches() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedChat, setSelectedChat, setChats, chats } =
    useContext(DateContext);

   

  const app = new Realm.App({id: "application-1-xqzti"})

  var email = "";

  const navigate = useNavigate();

  let { user } = useSelector((state) => ({ ...state }));

  if (!user) navigate("/");

  if (user) email = user.email;

  useEffect(() => {
   
    async function getData () {
      try{
    	const user = await app.logIn(Realm.Credentials.anonymous())
      const data =await user.functions.getAllData();
      console.log("REST",data);
      }
      catch(err){console.log(err)}
      

    }

    getData();

  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/all-match", { email,token:user.token})
      .then(function (response) {
        console.log(response.data);

        if (response.data.length == 0) setLoading(false);

        response.data.forEach(function (x) {
          var imageListRef = ref(storage, `${x}`);
          console.log(x);
          listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                if (url.includes("profile")) {
                  var local = {
                    image: url,
                    email: x,
                  };
                  console.log(local);

                  setPeople((prev) => [...prev, local]);
                }
              });
            });
          });

          // create a new chat

          axios
            .post("http://localhost:4000/api/chat", {
              fromemail: email,
              toemail: x,
            })
            .then((respose) => {
              console.log(response.data);
              if (!chats.find((c) => c._id === respose.data._id))
                setChats([respose.data, ...chats]);
              setSelectedChat(response.data);
              // toast.success("Chat Created")
            })
            .catch((err) => console.log(err));
        });
      });
  }, []);

  const swiped = (direction, name, toemail) => {
    console.log(toemail);
    if (direction == "up") {
      toast.success("Removed");
    } else {
      toast.success("Open Chat Box");
    }
  };

  const counter = useRef(0);
  const handleLoad = () => {
    console.log("Image Loading");
    counter.current += 1;
    if (counter.current >= people.length) setLoading(false);
  };

  return (
    <div className="DateMainDiv">
      <Header />
      <div className="row">
        {people.map((person) => (
          <div className="matchDiv col mb-3">
            <Card key={person.email} className="MatchImage">
              <CardMedia
                component="img"
                image={person.image}
                alt="Profile Image"
                onLoad={handleLoad}
                className="profileDivImage"
              />
              <CardContent>
                <h6>{person.email}</h6>
              </CardContent>
              <CardActions>
                <Button style={{ margin: "auto" }} size="small">
                  Chat
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      {/* <div className="ProfieCards">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.email}
            preventSwipe={["left", "right"]}
            onSwipe={(dir) => swiped(dir, person.name, person.email)}
          >
            <div
              style={{ backgroundImage: `url(${person.image})` }}
              className="Winkcard"
            >
              <h3>{person.email}</h3>
            </div>
          </TinderCard>
        ))}
      </div> */}
      {loading && <Loader />}
    </div>
  );
}

export default Matches;
