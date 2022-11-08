import React, { useContext, useState } from "react";
import { DateContext } from "./DateContext";
import "../styles/Header.css";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Forum";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import VideocamIcon from "@mui/icons-material/Videocam";
import Dropdown from "react-bootstrap/Dropdown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Header({ videoButton }) {
  const {
    switchToWink,
    switchToProfile,
    switchToChat,
    activeTab,
    switchToMacthes,
    switchToSetting,
    switchToDatePlanner,
    switchToNewsfeed,
    switchToLikes,
  } = useContext(DateContext);

  const navigate = useNavigate();

  return (
    <div className="HeaderWink">
      <Dropdown>
        <Dropdown.Toggle
          variant="secondary"
          className="DropItems"
          id="dropdown-basic"
        >
          {activeTab === "Profile" && (
            <IconButton>
              <PersonIcon style={{ color: "black" }} fontSize="large" />
            </IconButton>
          )}
          {activeTab === "Matches" && (
            <IconButton>
              <GroupIcon className="matchIconColor" fontSize="large" />
            </IconButton>
          )}
          {activeTab === "Chat" && (
            <IconButton>
              <ChatIcon style={{ color: "#f8de7e" }} fontSize="large" />
            </IconButton>
          )}
          {activeTab === "Setting" && (
            <IconButton>
              <SettingsIcon className="settingsIconColor" fontSize="large" />
            </IconButton>
          )}
          {activeTab === "DatePlanner" && (
            <IconButton>
              <BookIcon className="DatePlannerIconColor" fontSize="large" />
            </IconButton>
          )}
          {activeTab === "Newsfeed" && (
            <IconButton>
              <NewspaperIcon className="newsFeedIconColor" fontSize="large" />
            </IconButton>
          )}
          {activeTab === "ChatTab" && (
            <IconButton>
              <ChatIcon style={{ color: "#f8de7e" }} fontSize="large" />
            </IconButton>
          )}
          {activeTab === "Wink" && (
            <IconButton>
              <PersonIcon style={{ color: "black" }} fontSize="large" />
            </IconButton>
          )}
          {activeTab === "Likes" && (
            <IconButton>
              <ThumbUpIcon className="DatePlannerIconColor" fontSize="large" />
            </IconButton>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu className="DropMenu">
          <Dropdown.Item onClick={switchToProfile}>
            <IconButton>
              <PersonIcon style={{ color: "black" }} fontSize="large" />
              <p style={{ fontSize: "20px", marginLeft: "10px" }}>Profile</p>
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={switchToChat}>
            <IconButton>
              <ChatIcon style={{ color: "#f8de7e" }} fontSize="large" />
              <p style={{ fontSize: "20px", marginLeft: "10px" }}>Chat</p>
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={switchToNewsfeed}>
            <IconButton>
              <NewspaperIcon className="newsFeedIconColor" fontSize="large" />
              <p style={{ fontSize: "20px", marginLeft: "10px" }}>NewsFeed</p>
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={switchToDatePlanner}>
            <IconButton>
              <BookIcon className="DatePlannerIconColor" fontSize="large" />
              <p style={{ fontSize: "20px", marginLeft: "10px" }}>
                Date Planner
              </p>
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={switchToMacthes}>
            <IconButton>
              <GroupIcon className="matchIconColor" fontSize="large" />
              <p style={{ fontSize: "20px", marginLeft: "10px" }}>Matches</p>
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={switchToLikes}>
            <IconButton>
              <ThumbUpIcon className="DatePlannerIconColor" fontSize="large" />
              <p style={{ fontSize: "20px", marginLeft: "10px" }}>Like</p>
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item onClick={switchToSetting}>
            <IconButton>
              <SettingsIcon
                style={{ color: "gray" }}
                className="settingsIconColor"
                fontSize="large"
              />
              <p style={{ fontSize: "20px", marginLeft: "10px" }}>Settings</p>
            </IconButton>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <img
        src="/logo.png"
        alt="logo"
        className="headerLogo"
        onClick={switchToWink}
        style={{ cursor: "pointer" }}
      />

      {videoButton ? (
        <IconButton style={{ color: "#d0f0c0" }}>
          <VideocamIcon fontSize="large" />
        </IconButton>
      ) : (
        <div style={{ width: "55px" }}></div>
      )}
    </div>
  );
}

export default Header;
