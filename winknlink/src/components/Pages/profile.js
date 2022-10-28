import React from "react";
import "../styles/profile.css";
import Form from "react-bootstrap/Form";
import Multiselect from "multiselect-react-dropdown";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Stack } from "react-bootstrap";

export default function Profile() {
  const options = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
  ];

  const style = {
    chips: {
      background: "red",
    },
    searchBox: {
      border: "none",
      "border-bottom": "1px solid blue",
      "border-radius": "0px",
    },
    multiselectContainer: {
      color: "red",
    },
  };

  function readURL() {
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      document.getElementById("profile-upload").style.backgroundImage =
        "url(" + reader.result + ")";
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
    }
  }

  return (
    <div className="sttngs">
      <h2>Profile</h2>
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
          <article>
            <div className="frm">
              <div className="row mb-5 pt-3">
                <div
                  className="m-auto"
                  id="profile-upload"
                  style={{ backgroundImage: "/person.svg" }}
                >
                  <div className="hvr-profile-img">
                    <input
                      type="file"
                      name="logo"
                      id="getval"
                      accept="image/png, image/jpeg"
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
                <Button variant="outline-success">Upload</Button>
              </div>

              <div className="tr">
                <label className="label" for="input">
                  NAME
                </label>
                <input className="input" type="text" id="input" />

                <label
                  className="label"
                  for="dob"
                  style={{ marginTop: "30px" }}
                >
                  Date Of Birth
                </label>
                <input className="input" type="date" id="input" />
              </div>
              <br />
              <label className="label" for="age">
                Age
              </label>
              <input className="input" type="text" id="age" />
              <label className="label" for="inputemail">
                EMAIL
              </label>
              <div className="row">
                <div className="col">
                  <input className="input texte" type="email" id="inputemail" />
                </div>
              </div>
              <label className="label" for="phone">
                Phone Number
              </label>
              <input className="input" type="text" id="phone" />

              <div className="row">
                <div className="col-md-6">
                  <label className="label" for="gender">
                    Gender
                  </label>
                </div>
                <div className="col-md-6">
                  <select id="gender">
                    <option value="gender">Select gender:</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <label
                className="label"
                for="address"
                style={{ paddingTop: "10px" }}
              >
                Address
              </label>
              <Form.Control as="textarea" rows={3} id="address" />
              <label className="label mt-2" for="hobby">
                Hobbies
              </label>
              <Multiselect
                id="hobby"
                options={options}
                displayValue="name"
                style={style}
              />
              <button
                className="SettingButton"
                type="button"
                style={{ marginTop: "20px" }}
              >
                Update profile
              </button>
            </div>
          </article>
        </section>
        <section id="section2">
          <input className="t" type="radio" name="sections" id="option2" />
          <label for="option2" className="trr">
            Upload
          </label>
          <article style={{ textAlign: "center" }}>
            <div className="tr wwq" style={{ justifyContent: "center" }}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="label" for="photo">
                    Add photos
                  </label>
                </div>
                <div className="col-md-6 mb-3">
                  <input type="file" multiple id="photo" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="label" for="video">
                    Add Video
                  </label>
                </div>
                <div className="col-md-6 mb-3">
                  <input type="file" multiple id="video" />
                </div>
              </div>
            </div>
            <button className="SettingButton" type="button">
              Upload
            </button>
          </article>
        </section>
        <section id="section3">
          <input className="t" type="radio" name="sections" id="option3" />
          <label for="option3" className="trr">
            Photos
          </label>
          <article>
            <div className="tr wwq">
              <div className="row photoArea">
                <div className="col-auto mb-3 PhotoDiv">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="/person.svg" />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button variant="outline-danger">Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-auto mb-3 PhotoDiv">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="/person.svg" />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button variant="outline-danger">Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-auto mb-3 PhotoDiv">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="/person.svg" />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button variant="outline-danger">Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-auto mb-3 PhotoDiv">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="/person.svg" />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button variant="outline-danger">Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-auto mb-3 PhotoDiv">
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="/person.svg" />
                    <Card.Body style={{ textAlign: "center" }}>
                      <Button variant="outline-danger">Delete</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
