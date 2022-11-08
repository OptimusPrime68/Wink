import React from "react";
import "../styles/swipeButtons.css";
import Undo from "@mui/icons-material/Replay";
import Like from "@mui/icons-material/Favorite";
import Dislike from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";



const SwipeButtons = ({swipe,goBack}) => {


  

  return (
    <div className="swipeButtons">
      <IconButton className="swipeDislike" onClick={swipe}>
        <Dislike fontSize="large" />
      </IconButton>
      <IconButton className="swipeUndo" onClick={goBack}>
        <Undo fontSize="large" />
      </IconButton>
      <IconButton className="swipeLike" onClick={swipe}>
        <Like fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
