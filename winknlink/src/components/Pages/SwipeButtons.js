import React from "react";
import "../styles/swipeButtons.css";
import Undo from "@mui/icons-material/Replay";
import Like from "@mui/icons-material/Favorite";
import Dislike from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";


const SwipeButtons = () => {
  return (
    <div className="swipeButtons">
      <IconButton className="swipeDislike">
        <Dislike fontSize="large" />
      </IconButton>
      <IconButton className="swipeUndo">
        <Undo fontSize="large" />
      </IconButton>
      <IconButton className="swipeLike">
        <Like fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
