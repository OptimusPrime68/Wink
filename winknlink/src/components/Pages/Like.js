import React from "react";
import Header from "./Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import { useEffect, useState, useRef } from "react";
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
import { toast } from "react-toastify";
import Loader from "./Loader";
import MatchProfile from "./MatchProfile";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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

function Like() {
  let { user } = useSelector((state) => ({ ...state }));
  const [like, setLike] = useState([]);
  const [superLike, setSuperLike] = useState([]);
  const [loading, setLoading] = useState(false);

  const [likeState, setLikeState] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/get-super-like", { email: user.email })
      .then((r) => {
        if (r.data.m.length == 0) setLoading(false);

        r.data.m.map((e) => {
          const imageListRef = ref(storage, `${e.email}`);
          listAll(imageListRef)
            .then((response) => {
              response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                  if (url.includes("profile")) {
                    e["image"] = url;
                  }
                  setSuperLike((prev) => [...prev, e]);
                });
              });
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((e) => console.log(e));

    if (user.user == "premium") {
      axios
        .post("http://localhost:4000/api/get-likes", { email: user.email })
        .then((r) => {
          if (r.data.m.length == 0) setLoading(false);

          r.data.m.map((e) => {
            const imageListRef = ref(storage, `${e.email}`);
            listAll(imageListRef)
              .then((response) => {
                if (response.items.length == 0) setLoading(false);

                response.items.forEach((item) => {
                  getDownloadURL(item).then((url) => {
                    if (url.includes("profile")) {
                      e["image"] = url;
                    }
                    setLike((prev) => [...prev, e]);
                  });
                });
              })
              .catch((error) => console.log(error));
            setLikeState(false);
          });
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const handlePopUp = () => {
    console.log("HH");
    if (user.user == "free") {
      toast.warn("Only for Premium User");
    }
  };

  const counter = useRef(0);
  const handleLoad1 = () => {
    console.log("Image Loading");
    counter.current += 1;
    if (counter.current >= like.length) setLoading(false);
  };

  const counters = useRef(0);
  const handleLoad2 = () => {
    console.log("Image Loading");
    counter.current += 1;
    if (counter.current >= like.length) setLoading(false);
  };

  const [id, setId] = useState();
  const [open, setOpen] = React.useState(false);
  function handleOpen(e) {
    setId(e);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Header />
      {loading ? <Loader /> : <></>}
      <div>
        <Tabs
          defaultActiveKey="SuperLike"
          id="uncontrolled-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="SuperLike" title="Super Like">
            <div className="row">
              {superLike &&
                superLike.map((e) => (
                  <div className="matchDiv col mb-3">
                    <Card
                      style={{
                        width: "200px",
                        textAlign: "center",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOpen(e.email)}
                    >
                      <CardMedia
                        onLoad={handleLoad2}
                        component="img"
                        image={e.image}
                        alt="Profile Image"
                        className="profileDivImage"
                        style={{
                          height: "200px",
                          width: "200px",
                          margin: "auto",
                        }}
                      />
                      <p>{e.name}</p>
                    </Card>
                  </div>
                ))}
            </div>
          </Tab>
          <Tab eventKey="Likes" title="Likes" disabled={likeState}>
            <div className="row">
              {like &&
                like.map((e) => (
                  <div className="matchDiv col mb-3">
                    <Card
                      style={{
                        width: "200px",
                        textAlign: "center",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOpen(e.email)}
                    >
                      <CardMedia
                        component="img"
                        image={e.image}
                        onLoad={handleLoad1}
                        alt="Profile Image"
                        className="profileDivImage"
                        style={{
                          height: "200px",
                          width: "200px",
                          margin: "auto",
                        }}
                      />
                      <p>{e.name}</p>
                    </Card>
                  </div>
                ))}
            </div>
          </Tab>
        </Tabs>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ padding: "10px" }}
        >
          <Box sx={style}>
            <MatchProfile id={id} />
            <div style={{ textAlign: "center" }}>
              <Button onClick={handleClose}>Close</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Like;
