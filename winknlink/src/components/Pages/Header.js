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

function Header({ videoButton }) {
  const { switchToWink } = useContext(DateContext);
  const { switchToProfile } = useContext(DateContext);
  const { switchToChat } = useContext(DateContext);

  const navigate = useNavigate();

  const [page, setPage] = useState("profile");

  // const handleProfile = () =>{
  //   setPage('profile')
  //   switchToProfile;
  // }

  return (
    <div className="HeaderWink">
      {/* <ul className="avatarMenu">
        <li>
          <IconButton onClick={switchToProfile}>
            <PersonIcon fontSize="large" />
          </IconButton>
          <ul class="drop-menu menu-2">
            <li>
              <IconButton onClick={switchToProfile}>
                <PersonIcon fontSize="large" />
              </IconButton>
            </li>
            <li>
              <IconButton onClick={switchToChat}>
                <ChatIcon fontSize="large" />
              </IconButton>
            </li>
            <li>
              <IconButton className="BottomButtons">
                <GroupIcon className="matchIconColor" fontSize="large" />
              </IconButton>
            </li>
            <li>
              <IconButton className="BottomButtons">
                <NewspaperIcon className="newsFeedIconColor" fontSize="large" />
              </IconButton>
            </li>
            <li>
              <IconButton className="BottomButtons">
                <BookIcon className="DatePlannerIconColor" fontSize="large" />
              </IconButton>
            </li>
            <li>
              <IconButton className="BottomButtons">
                <SettingsIcon className="settingsIconColor" fontSize="large" />
              </IconButton>
            </li>
          </ul>
        </li>
      </ul> */}
      <Dropdown>
        <Dropdown.Toggle className="DropItems" id="dropdown-basic">
          <IconButton>
            <PersonIcon fontSize="large" />
          </IconButton>
        </Dropdown.Toggle>

        <Dropdown.Menu className="DropMenu">
          <Dropdown.Item href="#/action-1">
            <IconButton onClick={switchToProfile}>
              <PersonIcon fontSize="large" />
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
            {" "}
            <IconButton onClick={switchToChat}>
              <ChatIcon fontSize="large" />
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            <IconButton>
              <GroupIcon className="matchIconColor" fontSize="large" />
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-4">
            <IconButton>
              <NewspaperIcon className="newsFeedIconColor" fontSize="large" />
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-5">
            <IconButton>
              <BookIcon className="DatePlannerIconColor" fontSize="large" />
            </IconButton>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-6">
            <IconButton>
              <SettingsIcon className="settingsIconColor" fontSize="large" />
            </IconButton>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <img
        src="/logo.png"
        alt="logo"
        className="headerLogo"
        onClick={switchToWink}
      />
      <IconButton>
        <VideocamIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default Header;
