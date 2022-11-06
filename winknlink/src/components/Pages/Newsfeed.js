import React from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BottomDrawer from "./BottomDrawer";
import "../styles/Newsfeed.css";
import DropzonePost from "./DropzonePost";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80%",
  overflowX: "hidden",
  overflowY: "scroll",
};

function Newsfeed() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <h1>News Feed</h1>
      <div className="newsDiv">
        <h6>Post Something...</h6>
        <div
          className="row"
          style={{ padding: "5px", width: "max-content", margin: "auto" }}
        >
          <Button
            variant="outline-primary"
            stlye={{ marginTop: "10px" }}
            onClick={handleOpen}
          >
            Add new post
          </Button>
        </div>
      </div>
      <div className="PostDiv">
        <div className="col CaptionDiv">
          <h3>Caption</h3>
        </div>
        <div className="row PostImgDiv">
          <img className="PostImg" src="/person.svg" />
        </div>
        <h4>Time</h4>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "10px" }}
      >
        <Box sx={style}>
          <div className="row" style={{ width: "100%" }}>
            <div className="col" style={{ width: "100%" }}>
              <IconButton onClick={handleClose} style={{ float: "right" }}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <DropzonePost />
        </Box>
      </Modal>
    </div>
  );
}

export default Newsfeed;
