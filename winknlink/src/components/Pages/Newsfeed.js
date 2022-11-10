import React from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BottomDrawer from "./BottomDrawer";
import "../styles/Newsfeed.css";
import DropzonePost from "./DropzonePost";
import { useEffect } from "react";
import axios from "axios";
import { getStorage } from "firebase/storage";
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
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardMedia from "@mui/material/CardMedia";
import SwiperCore, {
  Keyboard,
  Scrollbar,
  Pagination,
  Navigation,
} from "swiper/core";
import Notification from '../Notification'
SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation]);

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
  const [nameOfLike,setNameOfLike] = useState([]);
  const [loading, setLoading] = useState(false);
  let { user } = useSelector((state) => ({ ...state }));
  let userName  = user.name;
  const [profileD, setProfileD] = useState({});
  const [profile, setProfile] = useState(0);
  const [flag, setFlag] = useState(true);
  const dispatch = useDispatch();

  const counter = useRef(0);
  const handleLoad = () => {
    console.log("Image Loading");
    counter.current += 1;
    if (counter.current >= post.length) setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/get-profile-id", { email: user.email,token:user.token })
      .then((data) => {
        console.log(data.data);
        const id = data.data.id._id;
        console.log(id);
        setProfile(id);
        setProfileD(data.data.id);

        axios
          .post("http://localhost:4000/api/get-all-post", {
            authorid: id,
            email: user.email,
            token:user.token,
          })
          .then((data) => {
            console.log(data);

            if (data.data.length == 0) setLoading(false);

            data.data.map((e) => {
              const id = e._id;
              const ex = e.authorId.email;
              const imageListRef = ref(storage, `${ex}/post/${id}`);
              e["files"] = [];
              setPost((prev) => [...prev, e]);
              listAll(imageListRef).then((response) => {
                console.log(e.content, response);

                if (response.items.length == 0) setLoading(false);

                response.items.forEach((item) => {
                  getDownloadURL(item).then((url) => {
                    setLoading(false);

                    setPost((current) =>
                      current.map((obj) => {
                        if (obj == e) {
                          obj.files = [...obj.files, url];
                        }
                        return obj;
                      })
                    );
                  });
                });
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async (e) => {
    axios
      .post("http://localhost:4000/api/delete-post", { postId: e._id })
      .then((data) => {
        toast.success("Post Deleted");

        const storage = getStorage();
        e.files.map((file) => {
          const desertRef = ref(storage, file);
          deleteObject(desertRef)
            .then((s) => {})
            .catch((error) => {
              console.log(error);
            });
        });

        setPost(post.filter((a) => a !== e));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleLike = async (e, post, user) => {
    try {
      const d = await axios.post("http://localhost:4000/api/update-like", {
        post,
        user,
      });
      if (e.likes.some((obj) => obj._id == profile)) {
        for (var i = 0; i < e.likes.length; i++) {
          if (Object.values(e.likes[i]).indexOf(profile) > -1) {
            e.likes.splice(i, 1);
          }
        }
      } else {

        e.likes.push(profileD);
       
        Notification(e.authorId._id,userName + " Liked Your Post");
      }
      setFlag(!flag);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const showLike = (arr) => {
    console.log("Hover");
    var x = [];
    for (var i = 0; i < arr.length; i++) x.push(arr[i].name + ' ');
    setNameOfLike(x);
  };

  const onAddPost = (newPost) =>{
    axios
    .post("http://localhost:4000/api/get-post-by-id", {
      newPost,
      token:user.token,
    })
    .then((data) => {
      console.log(data);

      if (data.data.length == 0) setLoading(false);

      console.log(data);

      data.data.map((e) => {
        const id = e._id;
        const ex = e.authorId.email;
        const imageListRef = ref(storage, `${ex}/post/${id}`);
        e["files"] = [];
        setPost((prev) => [e, ...prev]);
        listAll(imageListRef).then((response) => {
          console.log(e.content, response);

          if (response.items.length == 0) setLoading(false);

          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setLoading(false);

              setPost((current) =>
                current.map((obj) => {
                  if (obj == e) {
                    obj.files = [...obj.files, url];
                  }
                  return obj;
                })
              );
            });
          });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

    

  }

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
                <div className="col-auto AvatarDiv">
                  <div className="row mb-1">
                    <div className="col-auto">
                      <Avatar sx={{ width: 45, height: 45 }} src={e.authorId.image} />
                    </div>
                    <div
                      className="col-auto"
                      style={{
                        float: "left",
                        marginLeft: "-13px",
                        marginTop: "10px",
                      }}
                    >
                      {e.authorId.name}
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
                  {e.authorId._id == profile ? (
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(e);
                      }}
                      fontSize="large"
                      style={{
                        color: "#e32636",
                        float: "right",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>

             {e.files.length != 0 &&  <div className="row PostImgDiv">
                <Swiper
                  grabCursor
                  keyboard={{ enabled: true }}
                  pagination={{ clickable: true }}
                  navigation
                  className=""
                >
                  {e.files && e.files.map((image, index) => (
                    <SwiperSlide key={index}>
                      <CardMedia
                        className="PostImg"
                        image={image}
                        onLoad={handleLoad}
                        style={{ marginRight: "10px" }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>}

              <div className="row">
                <div className="col-auto">
                  <div
                    style={{
                      height: "30px",
                      width: "30px",
                      marginLeft: "15px",
                      marginTop: "15px",
                    }}
                  >
                    <Heart
                      isActive={
                        flag
                          ? e.likes.some((obj) => obj._id == profile)
                            ? true
                            : false
                          : e.likes.some((obj) => obj._id == profile)
                          ? true
                          : false
                      }
                      onClick={() => {
                        handleLike(e, e._id, profile);
                      }}
                    />
                  </div>
                </div>
                <Tooltip title={nameOfLike}>
                  <div
                    className="col-auto"
                    style={{
                      marginTop: "17px",
                      fontSize: "16px",
                      marginLeft: "-15px",
                      color: "#949494",
                      cursor: "default",
                    }}
                    onMouseOver={() => showLike(e.likes)}
                  >
                    {e.likes.length}
                  </div>
                </Tooltip>
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
          <DropzonePost  onAddPosts={onAddPost} onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default Newsfeed;
