import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import "../styles/MatchProfile.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useState } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";
import { getStorage } from "firebase/storage";
import ReactPlayer from "react-player";

function MatchProfile({ id }) {
  console.log(id);

  const [data, setData] = useState();
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/get-user-profile", {
        email: id,
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const imageListRef = ref(storage, id);
    listAll(imageListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url.includes("profile")) {
              setProfileImage(url);
            } else {
              setImageList((prev) => [...prev, url]);
            }
          });
        });
      })
      .catch((error) => console.log(error));

    const videoRef = ref(storage, `${id}/video`);
    listAll(videoRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setVideoList((prev) => [...prev, url]);
          });
        });
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(imageList);
  console.log("Video List", videoList);

  const [key, setKey] = useState("photo");

  return (
    <div>
      <div className="py-5 h-100">
        <div className="justify-content-center align-items-center h-100 row">
          <div className="col" lg="9" xl="7">
            <Card variant="outlined">
              <CardContent>
                <div className="row mb-3">
                  <div className="col" style={{ textAlign: "center" }}>
                    <CardMedia
                      component="img"
                      image={profileImage}
                      alt="Person"
                      style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        border: "1px solid black",
                        margin: "auto",
                        marginBottom: "10px",
                      }}
                    />
                    {data ? data.name : ""}
                  </div>
                </div>
                <div className="row mb-3">
                  <h3>About</h3>
                  <p>
                    {data ? data.address : ""}
                    <br />
                    {data ? data.age : ""}
                    <br />
                    {data ? data.hobbies + " " : " "}
                  </p>
                </div>
                <Tabs
                  fill
                  id="MatchProfileTabDiv"
                  className="mb-3"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                >
                  <Tab eventKey="photo" title="Photos">
                    <div className="row">
                      {imageList &&
                        imageList.map((url) => {
                          return (
                            <div className="matchDiv col mb-3">
                              <Card id="matchProfileImageDiv">
                                <CardMedia
                                  component="img"
                                  image={url}
                                  alt="Profile Image"
                                  className="profileDivImage"
                                  style={{
                                    height: "200px",
                                    width: "200px",
                                    margin: "auto",
                                  }}
                                />
                              </Card>
                            </div>
                          );
                        })}
                    </div>
                  </Tab>
                  <Tab eventKey="video" title="Videos">
                    <div className="row">
                      {videoList &&
                        videoList.map((url) => {
                          return (
                            <div className="matchDiv col mb-3">
                              <Card id="matchProfileImageDiv">
                                <CardMedia
                                  component="video"
                                  src={url}
                                  alt="Profile Image"
                                  className="profileDivImage"
                                  style={{
                                    height: "200px",
                                    width: "200px",
                                    margin: "auto",
                                  }}
                                  controls={true}
                                />
                              </Card>
                            </div>
                          );
                        })}
                    </div>
                  </Tab>
                  <Tab eventKey="feed" title="Newsfeed">
                    <div className="row">
                      <div className="matchDiv col mb-3">
                        <Card id="matchProfileImageDiv">
                          <CardMedia
                            component="img"
                            image="/person.svg"
                            alt="Profile Image"
                            className="profileDivImage"
                            style={{
                              height: "200px",
                              width: "200px",
                              margin: "auto",
                            }}
                          />
                        </Card>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchProfile;
