import React from "react";
import "../styles/profile.css";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { getStorage } from "firebase/storage";
import { useTranslation } from "react-i18next";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  list,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Header from "./Header";
import { useGeolocated } from "react-geolocated";
import CircleLoader from "react-spinners/CircleLoader";
import { useDispatch } from "react-redux";

export default function Profile() {
  var email = "";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [hobbies, setHobby] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const [videoUpload, setVideoUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [profileImageList, setprofileImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["home"]);

  const dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  if (!user) navigate("/");

  if (user) email = user.email;

  const imageListRef = ref(storage, email);

  const upload = async (e) => {
    e.preventDefault();
    if (imageUpload) {
      let r = (Math.random() + 1).toString(36).substring(7);
      const imageRef = ref(storage, `${email}/${r}`);
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          toast.success("Image Uploaded");

          setImageList([]);
          listAll(imageListRef)
            .then((response) => {
              response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                  setImageList((prev) => [...prev, url]);
                });
              });
            })
            .catch((error) => console.log(error));
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const uploadProfile = async (e) => {
    e.preventDefault();
    if (imageUpload) {
      const imageRef = ref(storage, `${email}/profile`);
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          toast.success("Image Uploaded");

          setprofileImageList([]);
          listAll(imageListRef)
            .then((response) => {
              response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                  if (url.includes("profile")) {
                    dispatch({
                      type: "LOGGED_IN_USER",
                      payload: {
                        email: user.email,
                        token: user.token,
                        id: user.id,
                        user: user.user,
                        name: user.name,
                        image: url,
                      },
                    });
                    setprofileImageList((prev) => [...prev, url]);
                  }
                });
              });
            })
            .catch((er) => console.log(er));
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const onSelect = (e) => {
    var list = [];
    for (var i = 0; i < e.length; i++) list.push(e[i].name);
    setHobby(list);
  };

  const onRemove = (e) => {
    var list = [];
    for (var i = 0; i < e.length; i++) list.push(e[i].name);
    setHobby(list);
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  useEffect(() => {
    setLoading(true);

    axios
      .post("http://localhost:4000/api/get-user-profile", {
        email,
      })
      .then(function (response) {
        console.log("Response", response);
        if (response.data) {
          const data = response.data;
          setName(data.name);
          setPhone(data.phone);
          setGender(data.gender);
          if (data.dob != null) setDob(data.dob.substr(0, 10));
          setAddress(data.address);
          setHobby(data.hobbies);
          if (data.dob) setAge(getAge(data.dob.substr(0, 10)));
          toast.success("Profile Loaded");
        }
      })
      .catch(function (error) {
        toast.warn("Update Your Profile");
      });

    setImageList([]);
    listAll(imageListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      })
      .catch((error) => console.log(error));
    setImageList([]);

    listAll(imageListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url.includes("profile")) {
              setprofileImageList((prev) => [...prev, url]);
              console.log(user);
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  email: email,
                  token: user.token,
                  id: user.id,
                  user: user.userType,
                  name: user.name,
                  image: url,
                },
              });
            }
          });
        });
      })
      .catch((error) => console.log(error));

    setLoading(false);
  }, []);

  const update = (e) => {
    e.preventDefault();

    console.log(name);
    console.log(phone);
    console.log(gender);
    console.log(dob);
    console.log(address);
    console.log(hobbies);

    var location = {};
    if (coords)
      location = {
        type: "Point",
        coordinates: [coords.longitude, coords.latitude],
      };

    axios
      .post("http://localhost:4000/api/update-profile", {
        email,
        name,
        phone,
        gender,
        dob,
        address,
        hobbies,
        location,
        preference: "male",
        age,
      })
      .then(function (response) {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: email,
            token: user.token,
            id: user.id,
            user: user.user,
            name,
            image: user.image,
          },
        });

        toast.success("Updated");
        console.log(response);
      })
      .catch(function (error) {
        toast.error("Some Error Occured");
        console.log(error);
      });
  };

  const options = [
    { name: "Playing", id: 1 },
    { name: "Gaming", id: 2 },
    { name: "Trekking", id: 3 },
    { name: "Nothing", id: 4 },
    { name: "Blogging", id: 5 },
    { name: "Reading", id: 6 },
    { name: "Journaling", id: 7 },
    { name: "Vacation planning", id: 8 },
    { name: "Nature identification", id: 9 },
    { name: "Playing an instrument", id: 10 },
  ];

  const style = {
    chips: {
      background: "#fbab7e",
    },
    searchBox: {
      border: "none",
      "border-bottom": "1px solid #fbab7e",
      "border-radius": "0px",
    },
    multiselectContainer: {
      color: "#fbab7e",
    },
  };

  function readURL(e) {
    setImageUpload(e.target.files[0]);
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      document.getElementById("profile-upload").style.backgroundImage =
        "url(" + reader.result + ")";
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsDataURL(profileImageList[0]);
    }
  }

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const handleDOB = (e) => {
    setDob(e.target.value);
    setAge(getAge(e.target.value));
  };

  const handleDelete = (e) => {
    const storage = getStorage();
    const desertRef = ref(storage, e);
    console.log(imageList);
    deleteObject(desertRef)
      .then((s) => {
        // File deleted successfully
        var rem;
        rem = imageList.slice(imageList.indexOf(e), -1);
        console.log(rem);
        setImageList(rem);
        toast.success("Image Deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });

    console.log(e);
  };

  const uploadVideo = (e) => {
    e.preventDefault();
    if (videoUpload) {
      let r = (Math.random() + 1).toString(36).substring(7);
      const VideoRef = ref(storage, `${email}/video/${r}`);
      uploadBytes(VideoRef, videoUpload)
        .then(() => {
          toast.success("Video Uploaded");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="sttngs">
        <h2>{t("Profile")}</h2>
        <div className="tabordion">
          <section id="section1">
            <input
              style={{ visibility: "hidden" }}
              className="t"
              type="radio"
              name="sections"
              id="option1"
              defaultChecked
            />
            <label for="option1" className="trr">
              {" "}
              Account
            </label>
            <article className="articleDiv">
              <div className="frm" style={{ textAlign: "center" }}>
                <div className="row mb-5 pt-3">
                  <div
                    className="m-auto"
                    id="profile-upload"
                    style={{ backgroundImage: `url(${profileImageList[0]})` }}
                  >
                    <div className="hvr-profile-img">
                      <input
                        type="file"
                        name="logo"
                        id="getval"
                        className="upload"
                        onChange={readURL}
                      />
                      <div className="icon">
                        <div className="camera4">
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <Button
                    style={{ width: "30%", margin: "auto" }}
                    variant="outline-success"
                    onClick={uploadProfile}
                  >
                    Upload
                  </Button>
                </div>

                <div className="tr">
                  {loading && <CircleLoader color="#f70177" />}
                  <label className="label" for="input">
                    NAME
                  </label>
                  <input
                    value={phone}
                    className="input"
                    type="text"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <label
                    className="label"
                    for="address"
                    style={{ paddingTop: "10px" }}
                  >
                    Date Of Birth
                  </label>

                  <input
                    value={hobbies}
                    className="input"
                    type="date"
                    id="input"
                    onChange={handleDOB}
                  />
                </div>
                <br />
                <label className="label" for="age">
                  Age(Calculated by your DOB)
                </label>
                <input
                  value={age}
                  className="input"
                  disabled
                  type="text"
                  id="age"
                />
                <label className="label" for="inputemail">
                  EMAIL
                </label>
                <div className="row">
                  <div className="col">
                    <input
                      value={email}
                      className="input texte"
                      disabled
                      type="email"
                      id="inputemail"
                    />
                  </div>
                </div>
                <label className="label" for="phone">
                  Phone Number
                </label>
                <input
                  value={name}
                  className="input"
                  type="text"
                  id="phone"
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="row">
                  <div className="col-md-6">
                    <label className="label" for="gender">
                      Gender
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      value={gender}
                      id="gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="gender">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <br />

                <div className="row">
                  <div className="col-md-6" style={{ textAlign: "center" }}>
                    <label className="label" for="hobby">
                      Hobbies
                    </label>
                  </div>
                  <div className="col-md-6">
                    <Multiselect
                      id="hobby"
                      options={options}
                      displayValue="name"
                      style={style}
                      onSelect={onSelect}
                      onRemove={onRemove}
                    />
                  </div>
                </div>
                <button
                  className="SettingButton"
                  type="button"
                  style={{
                    marginTop: "20px",
                  }}
                  onClick={update}
                >
                  Update profile
                </button>
              </div>
            </article>
          </section>
          <section id="section2">
            <input
              style={{ visibility: "hidden" }}
              className="t"
              type="radio"
              name="sections"
              id="option2"
            />
            <input className="t" type="radio" name="sections" id="option2" />
            <label for="option2" className="trr">
              {" "}
              Upload
            </label>
            <article style={{ textAlign: "center" }} className="articleDiv">
              <div className="tr wwq" style={{ justifyContent: "center" }}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="label" for="photo">
                      Add photos
                    </label>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="file"
                      multiple
                      id="photo"
                      onChange={(e) => setImageUpload(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label className="label" for="video">
                      Add Video
                    </label>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="file"
                      multiple
                      id="video"
                      onChange={(e) => setVideoUpload(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <button className="SettingButton" type="button" onClick={upload}>
                Upload
              </button>
            </article>
          </section>
          <section id="section3">
            <input className="t" type="radio" name="sections" id="option3" />
            <label for="option3" className="trr">
              Photos
            </label>
            <article className="articleDiv">
              <div className="tr wwq">
                {imageList &&
                  imageList.map((url) => {
                    return (
                      <div className="row photoArea">
                        <div className="col-auto mb-3 m-auto PhotoDiv">
                          <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={url} />
                            <Card.Body style={{ textAlign: "center" }}>
                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  handleDelete(url);
                                }}
                              >
                                Delete
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
