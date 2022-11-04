import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import GroupIcon from "@mui/icons-material/Group";
import "../styles/BottomDrawer.css";
import BookIcon from "@mui/icons-material/Book";

const BottomDrawer = () => {
  return (
    <div id="bottomDrawer">
      <div className="BottomDrawerButtons">
        <IconButton className="BottomButtons">
          <GroupIcon className="matchIconColor" fontSize="large" />
        </IconButton>
        <IconButton className="BottomButtons">
          <NewspaperIcon className="newsFeedIconColor" fontSize="large" />
        </IconButton>
        <IconButton className="BottomButtons">
          <BookIcon className="DatePlannerIconColor" fontSize="large" />
        </IconButton>
        <IconButton className="BottomButtons">
          <SettingsIcon className="settingsIconColor" fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default BottomDrawer;
