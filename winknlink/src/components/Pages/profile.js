import React from "react";
import "../styles/profile.css";

export default function profile() {
  return (
    <div className="sttngs">
      <h2>Profile</h2>
      <div className="tabordion">
        <section id="section1">
          <div className="frm">
            <div id="profile-upload" style={{ backgroundImage: "/person.svg" }}>
              <div className="hvr-profile-img">
                <input
                  type="file"
                  name="logo"
                  id="getval"
                  accept="image/png, image/jpeg"
                  className="upload"
                />
                <div className="icon">
                  <div className="camera4">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tr">
              <label className="label" for="input">
                NAME
              </label>
              <input className="input" type="text" id="input" />

              <label className="label" for="dob" style={{ marginTop: "30px" }}>
                Date Of Birth
              </label>
              <input className="input" type="date" id="input" />
            </div>

            <br />

            <label className="label" for="inputemail">
              EMAIL
            </label>
            <div className="row">
              <div className="col-md-8">
                <input className="input texte" type="email" id="inputemail" />
              </div>
            </div>

            <label className="label" for="phone">
              Phone Number
            </label>
            <input className="input" type="text" id="phone" />

            <button type="button" style={{ marginTop: "10px" }}>
              Update profile
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
