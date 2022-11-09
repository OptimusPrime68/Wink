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

function Like() {
  let { user } = useSelector((state) => ({ ...state }));
  const [like, setLike] = useState([]);
  const [superLike, setSuperLike] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/get-super-like", { email: user.email,token:user.token })
      .then((r) => {

        if(r.data.m.length == 0)
        setLoading(false);

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
        .post("http://localhost:4000/api/get-likes", { email: user.email,token:user.token })
        .then((r) => {


        if(r.data.m.length == 0)
        setLoading(false);

          r.data.m.map((e) => {
            const imageListRef = ref(storage, `${e.email}`);
            listAll(imageListRef)
              .then((response) => {

                if(response.items.length == 0)
                setLoading(false);

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
          <Tab eventKey="SuperLike" title="Super Like" >
            <div className="row">
              {superLike &&
                superLike.map((e) => (
                  <div className="matchDiv col mb-3">
                    <Card style={{ width: "200px", textAlign: "center" }}>
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
          <Tab eventKey="Likes" title="Likes">
            <div className="row">
              {like &&
                like.map((e) => (
                  <div className="matchDiv col mb-3">
                    <Card style={{ width: "200px", textAlign: "center" }}>
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
      </div>
    </div>
  );
}

export default Like;
