import React from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Dropzone from "./Dropzone";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
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
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
          maxWidth: "500px",
          margin: "auto",
          marginTop: "50px",
        }}
      >
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: "10px" }}
      >
        <Box sx={style}>
          <IconButton>
            <CloseIcon />
          </IconButton>
          <Dropzone />
        </Box>
      </Modal>
    </div>
  );
}

export default Newsfeed;
