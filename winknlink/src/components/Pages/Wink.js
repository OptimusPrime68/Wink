import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import "../styles/Wink.css";
import SwipeButtons from "./SwipeButtons";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";

function Wink() {
  const [people, setPeople] = useState([
    {
      name: "Person 1",
      url: "/person1.jfif",
    },
    {
      name: "Person 2",
      url: "/person2.jfif",
    },
    {
      name: "Person 3",
      url: "/person3.jfif",
    },
    {
      name: "Person 4",
      url: "/person4.jpg",
    },
    {
      name: "Person 5",
      url: "/person5.jfif",
    },
  ]);

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
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="Winkcard"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
        <SwipeButtons />
      </div>
    </div>
  );
}

export default Wink;
