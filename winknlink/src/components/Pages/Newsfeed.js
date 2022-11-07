import React from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BottomDrawer from "./BottomDrawer";
import "../styles/Newsfeed.css";
import DropzonePost from "./DropzonePost";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";
import { useState, useRef } from "react";
import Loader from "./Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import Heart from "react-heart";

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
  const [post, setPost] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  let { user } = useSelector((state) => ({ ...state }));

  const counter = useRef(0);
  const handleLoad = () => {
    console.log("Image Loading");
    counter.current += 1;
    if (counter.current >= post.length) setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/get-profile-id", { email: user.email })
      .then((data) => {
        const id = data.data.id;

        axios
          .post("http://localhost:4000/api/get-all-post", {
            authorid: id,
            email: user.email,
          })
          .then((data) => {
            if (data.data.length == 0) setLoading(false);

            data.data.map((e) => {
              const id = e._id;
              const ex = e.authorId.email;
              const imageListRef = ref(storage, `${ex}/post/${id}`);
              e["files"] = [];
              setPost((prev) => [...prev, e]);
              listAll(imageListRef)
                .then((response) => {
                  response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                      setPost((current) =>
                        current.map((obj) => {
                          if (obj == e) {
                            obj.files = [...obj.files, url];
                            console.log(obj);
                          }
                          return obj;
                        })
                      );
                    });
                  });
                })
                .catch((error) => console.log(error));
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(post);

  const [active, setActive] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? <Loader /> : <></>}
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

      {post &&
        post.map((e) => {
          return (
            <div className="PostDiv">
              <div className="row">
                <div className="col AvatarDiv">
                  <div className="row mb-1">
                    <div className="col-auto">
                      <Avatar sx={{ width: 45, height: 45 }} />
                    </div>
                    <div
                      className="col-auto"
                      style={{
                        float: "left",
                        marginLeft: "-13px",
                        marginTop: "10px",
                      }}
                    >
                      Name
                    </div>
                  </div>
                  <div className="row DateH4">
                    <p>
                      {new Date(e.createdAt).toDateString() +
                        " " +
                        new Date(e.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="col DelDiv">
                  <DeleteIcon
                    fontSize="large"
                    style={{
                      color: "#e32636",
                      float: "right",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              {e.files &&
                e.files.map((url) => {
                  return (
                    <div className="row PostImgDiv">
                      <img className="PostImg" src={url} onLoad={handleLoad} />
                    </div>
                  );
                })}

              <div
                style={{
                  height: "30px",
                  width: "30px",
                  marginLeft: "15px",
                  marginTop: "15px",
                }}
              >
                <Heart isActive={active} onClick={() => setActive(!active)} />
              </div>

              <div className="col CaptionDiv">
                <p>{e.content}</p>
              </div>
            </div>
          );
        })}

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
