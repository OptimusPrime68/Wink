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
import { ref,uploadBytes,listAll,getDownloadURL,list,deleteObject} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Header from "./Header";
import { useGeolocated } from "react-geolocated";
import { useDispatch } from "react-redux";
import Dropzone from "./Dropzone";
import ReactPlayer from "react-player";
import { useRef } from "react";
import Loader from "./Loader";

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
  const [coordin, setCoordinates] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [profileImageList, setprofileImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["home"]);
  const myRef = useRef();

  const dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  if (!user) navigate("/");

  if (user) email = user.email;

  const imageListRef = ref(storage, email);

  const uploadProfile = async (e) => {
    e.preventDefault();
    if (imageUpload) {
      const imageRef = ref(storage, `${email}/profile`);
      console.log(imageRef);
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          toast.success("Image Uploaded");

          setprofileImageList([]);
          listAll(imageListRef)
            .then((response) => {
              response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                  if (url.includes("profile")) {
                    try{
                    axios
                    .post("http://localhost:4000/api/update-profile", {
                      email,image:url, token:user.token});
                    }catch(err)
                    {
                      
                    }
                    dispatch({
                      type: "LOGGED_IN_USER",
                      payload: {
                        email: user.email,
                        token: user.token,
                        id: user.id,
                        user: user.user,
                        name: user.name,
                        image: url,
                        profile_id:user.profile_id,
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

    var dist = 1000000000;
    axios
      .post("http://localhost:4000/api/get-user-profile", {
        email,token:user.token,
      })
      .then(function (response) {
      //  console.log("Response", response);
        if (response.data) {
          const data = response.data;
          var profile_id = data._id;
          setName(data.name);
          setPhone(data.phone);
          setGender(data.gender);
          if (data.dob != null) setDob(data.dob.substr(0, 10));
          setAddress(data.address);
          setHobby(data.hobbies);
          if (data.dob) setAge(getAge(data.dob.substr(0, 10)));
          if (data.distance) dist = data.distance;
          toast.success("Profile Loaded");
          window.localStorage.setItem("distance", dist);
          window.localStorage.setItem("profile_id",data._id)
          listAll(imageListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url.includes("profile")) {
              setprofileImageList((prev) => [...prev, url]);
            //  console.log(user);
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  email: email,
                  token: user.token,
                  id: user.id,
                  user: user.user,
                  name: data.name,
                  image: url,
                  distance: dist,
                  profile_id,
                },
              });
            }
          });
        });
      })
      .catch((error) => console.log(error));
        }
      })
      .catch(function (error) {
        toast.warn("Update Your Profile");
      });

    

    setLoading(false);
  }, []);

  const update = (e) => {
    e.preventDefault();

    // console.log(name);
    // console.log(phone);
    // console.log(gender);
    // console.log(dob);
    // console.log(address);
    // console.log(hobbies);

    var coordinates = [];
    if (coords) coordinates = [coords.longitude, coords.latitude];

    console.log(coordinates);
    setCoordinates(coordinates);

    if (phone && phone.length != 10) {
      toast.error("Phone Number Incorrect");
      return;
    }

    axios
      .post("http://localhost:4000/api/update-profile", {
        email,
        name,
        phone,
        gender,
        dob,
        address,
        hobbies,
        location: coordinates,
        age,
        token:user.token,
      })
      .then(function (response) {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: email,
            token: user.token,
            id: user.id,
            user: user.user,
            name:name,
            image: user.image,
            profile_id:response.data._id,
          },
        });
        window.localStorage.setItem("profile_id",response.data._id)

        toast.success("Updated");
       // console.log(response);
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
 // console.log(coords);

  const handleDOB = (e) => {
    const max =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      (new Date().getDate() <= 9
        ? "0" + new Date().getDate()
        : new Date().getDate());

    if (e.target.value >= max) {
      toast.error("Wrong Date Selected");
      return;
    }

    console.log(max + e.target.value);

    setDob(e.target.value);
    setAge(getAge(e.target.value));
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleDelete = (e) => {
    const storage = getStorage();
    const desertRef = ref(storage, e);
    deleteObject(desertRef)
      .then((s) => {
        setImageList(imageList.filter((a) => a !== e));

        toast.success("Image Deleted");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(e);
  };

  const uploadVideo = (e) => {
    e.preventDefault();
    setLoading(true);
    if (videoUpload) {
      let r = (Math.random() + 1).toString(36).substring(7);
      const VideoRef = ref(storage, `${email}/video/${r}`);
      console.log(VideoRef);
      uploadBytes(VideoRef, videoUpload)
        .then(() => {
          toast.success("Video Uploaded");
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const [videoSrc, seVideoSrc] = useState("");

  const handleVideo = (event) => {
    console.log(event);
    setVideoUpload(event.target.files[0]);
    seVideoSrc(URL.createObjectURL(event.target.files[0]));
  };

  const loadPhoto = async () => {
    setLoading(true);
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
  };
  console.log("Loading", loading);

  const imageLoaded = () => {
    console.log("Loading IMages");
  };


  const counter = useRef(0);
  const handleLoad = () => {
    console.log("Image Loading")
    counter.current += 1;
    if (counter.current >= imageList.length) setLoading(false);
  };


  return (
    <div>
      <Header />

      {loading ? <Loader /> : <></>}
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
              {t("Account")}
            </label>
            <article className="articleDiv">
              <div className="frm" style={{ textAlign: "center" }}>
                <div className="row mb-5 pt-3">
                  <div
                    className="m-auto"
                    id="profile-upload"
                    onLoad={imageLoaded}
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
                    {t("Upload")}
                  </Button>
                </div>

                <div className="tr">
                  <label className="label" for="input">
                  {t("Name")}
                  </label>
                  <input
                    value={name}
                    className="input"
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label
                    className="label"
                    for="address"
                    style={{ paddingTop: "10px" }}
                  >
                    {t("Date Of Birth")}
                  </label>

                  <input
                    value={dob}
                    className="input"
                    type="date"
                    id="input"
                    onChange={handleDOB}
                  />
                </div>
                <br />
                <label className="label" for="age">
                {t("Age(Calculated by your DOB)")}
                </label>
                <input
                  value={age}
                  className="input"
                  disabled
                  type="text"
                  id="age"
                />
                <label className="label" for="inputemail">
                {t("Email")}
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
                {t("Phone Number")}
                </label>
                <input
                  value={phone}
                  className="input"
                  type="text"
                  id="phone"
                  onChange={handlePhone}
                />

                <div className="row">
                  <div className="col-md-6">
                    <label className="label" for="gender">
                    {t("Gender")}
                    </label>
                  </div>
                  <div className="col-md-6">
                    <select
                      value={gender}
                      id="gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="gender">{t("Gender")}</option>
                      <option value="male">{t("Male")}</option>
                      <option value="female">{t("Female")}</option>
                    </select>
                  </div>
                </div>

                <br />

                <label className="label" for="gender">
                {t("Address")}
                </label>
                <input
                  value={address}
                  className="input"
                  type="text"
                  id="phone"
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label className="label" for="phone">
                {t("Location Coordinates")}
                </label>
                {isGeolocationAvailable && isGeolocationEnabled && coords && (
                  <input
                    value={coords.latitude + " " + coords.longitude}
                    className="input"
                    type="text"
                    id="phone"
                  />
                )}

                <div className="row">
                  <div className="col-md-6" style={{ textAlign: "center" }}>
                    <label className="label" for="hobby">
                    {t("Hobbies")}
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
                  {t("Update Profile")}
                </button>
              </div>
            </article>
          </section>
          <section id="section2">
            <input className="t" type="radio" name="sections" id="option2" />
            <label for="option2" className="trr">
              {" "}
              {t("Upload")}
            </label>
            <article style={{ textAlign: "center" }} className="articleDiv">
              <div className="tr wwq">
                <div className="row mb-3" style={{ width: "100%" }}>
                  <Dropzone className="mainDropzone" ref={myRef} />
                </div>
              </div>
              {/* <button className="SettingButton" type="button"  >
                Upload Photo
              </button> */}
              <div className="tr wwq">
                <div className="row mb-3" style={{ width: "100%" }}>
                  <Form.Control
                    size="lg"
                    type="file"
                    placeholder="Video Upload"
                    onChange={handleVideo}
                    accept="video/mp4,video/x-m4v,video/*"
                    style={{ margin: "auto", width: "90%" }}
                  />
                </div>
                <div className="row mb-3" style={{ width: "100%" }}>
                  <ReactPlayer url={videoSrc} width="100%" controls={true} />
                </div>
              </div>
              <button
                className="SettingButton"
                type="button"
                onClick={uploadVideo}
              >
                {t("Upload Video")}
              </button>
            </article>
          </section>
          <section id="section3">
            <input className="t" type="radio" name="sections" id="option3" />
            <label for="option3" className="trr" onClick={loadPhoto}>
            {t("Photos")}
            </label>
            <article className="articleDiv">
              <div className="tr wwq">
                {imageList &&
                  imageList.map((url) => {
                    return (
                      <div
                        className="row photoArea"
                        style={{ padding: "10px" }}
                      >
                        <div className="col-auto mb-3 m-auto PhotoDiv">
                          <Card style={{ width: "18rem", padding: "10px" }}>
                            <Card.Img
                              className="PhotoPreviewSection"
                              variant="top"
                              onLoad={handleLoad}
                              src={url}
                            />
                            <Card.Body style={{ textAlign: "center" }}>
                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  handleDelete(url);
                                }}
                              >
                                {t("Delete")}
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
