import React from "react";
import "../styles/settings.css";
import Slider from "@mui/material/Slider";
import Language from "../Language";
import axios from "axios";
import {toast} from 'react-toastify'
import { useSelector } from "react-redux";

function valuetext(value) {
  return value;
}

function valuetextAge(valueAge) {
  return valueAge;
}

export default function Settings() {
  const [value, setValue] = React.useState([0, 37]);
  const [valueAge, setValueAge] = React.useState([18, 25]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeAge = (eventAge, newValueAge) => {
    setValueAge(newValueAge);
  };

  let {user} = useSelector((state) => ({ ...state }));

  const handlePreference = async (e) =>{
    console.log(user.email);
    axios
    .post("http://localhost:4000/api/update-profile", {
      preference:e,
      email:user.email
    })
    .then(function (response) {
      toast.success("Updated");
      console.log(response);
    })
    .catch(function (error) {
      toast.error("Some Error Occured");
      console.log(error);
    });
};
  

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="tabSettings">
        <section id="sectionId">
          <div className="row p-5">
            <div className="col-md-6 mb-3">
              <h4 className="Language">Language preference</h4>
            </div>
            <div className="select col-md-6 mb-3">

              <Language />
            </div>
          </div>
          <div className="row p-5">
            <div className="col-md-6 mb-3">
              <h4 className="Language">Preference</h4>
            </div>
            <div className="select col-md-6 mb-3">
              <select onChange={(e)=>handlePreference(e.target.value)}>
                <option value="1">Select Gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div className="row p-5">
            <div className="col-md-6 mb-3">
              <h4 className="Language">Age</h4>
            </div>
            <div className=" col-md-6 mb-3">
              <Slider
                getAriaLabel={() => "Age"}
                value={valueAge}
                onChange={handleChangeAge}
                valueLabelDisplay="auto"
                getAriaValueText={valuetextAge}
                color="secondary"
                min={18}
                max={70}
              />
            </div>
          </div>
          <div className="row p-5">
            <div className="col-md-6 mb-3">
              <h4 className="Language">Distance</h4>
            </div>
            <div className=" col-md-6 mb-3">
              <Slider
                getAriaLabel={() => "Distance"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                color="secondary"
                min={0}
                max={500}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
