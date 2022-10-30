import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import GroupIcon from "@mui/icons-material/Group";
import "../styles/BottomDrawer.css";

const BottomDrawer = () => {
  return (
    <div className="BottomDrawerButtons">
      <IconButton className="BottomButtons">
        <GroupIcon className="matchIconColor" fontSize="large" />
      </IconButton>
      <IconButton className="BottomButtons">
        <NewspaperIcon className="newsFeedIconColor" fontSize="large" />
      </IconButton>
      <IconButton className="BottomButtons">
        <SettingsIcon className="settingsIconColor" fontSize="large" />
      </IconButton>
    </div>
  );
};

export default BottomDrawer;
