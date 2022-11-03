import React from "react";
import "../styles/settings.css";
import Slider from "@mui/material/Slider";
import Language from "../Language";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Header from "./Header";

function valuetext(value) {
  return value;
}

function valuetextAge(valueAge) {
  return valueAge;
}

const PrettoSlider = styled(Slider)({
  color: "#fbab7e",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#fbab7e",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function Settings() {
  const [value, setValue] = React.useState([0, 37]);
  const [valueAge, setValueAge] = React.useState([18, 25]);

  const [pref, setPref] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeAge = (eventAge, newValueAge) => {
    setValueAge(newValueAge);
    console.log(valueAge);
    axios
      .post("http://localhost:4000/api/update-profile", {
        agePreference: valueAge,
        email: user.email,
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

  let { user } = useSelector((state) => ({ ...state }));

  const handlePreference = async (e) => {
    setPref(e);
    console.log(user.email);
    axios
      .post("http://localhost:4000/api/update-profile", {
        preference: e,
        email: user.email,
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
    <div>
      <Header />
      <div className="settings">
        <h2>Settings</h2>
        <div className="tabSettings">
          <section id="sectionId">
            <div className="row p-3">
              <div className="col-md-6 mb-3">
                <h4 className="Language">Language preference</h4>
              </div>
              <div className="select col-md-6 mb-3">
                <Language />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6 mb-3">
                <h4 className="Language">Preference</h4>
              </div>
              <div className="col-md-6 mb-3">
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={pref}
                    label="Preference"
                    onChange={(e) => handlePreference(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>Select Gender</em>
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6 mb-3">
                <h4 className="Language">Age</h4>
              </div>
              <div className=" col-md-6 mb-3">
                <PrettoSlider
                  getAriaLabel={() => "Age"}
                  value={valueAge}
                  onChange={handleChangeAge}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetextAge}
                  // color="#fbab7e"
                  min={18}
                  max={70}
                />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6 mb-3">
                <h4 className="Language">Distance</h4>
              </div>
              <div className=" col-md-6 mb-3">
                <PrettoSlider
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
    </div>
  );
}
