import React, { useState, useEffect } from "react";
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
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import BottomDrawer from "./BottomDrawer";

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
  const [value, setValue] = React.useState(0);
  const [valueAge, setValueAge] = React.useState([18, 25]);
  const [pref, setPref] = React.useState("");

  const [month, setMonth] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeAge = (eventAge, newValueAge) => {
    setValueAge(newValueAge);
  };

  const handlePreference = async (e) => {
    setPref(e);
  };

  let { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubscription = async (e) => {
    console.log(e);
    setSub(e);
  };

  const handleMonth = async (e) => {
    console.log(e);
    setMonth(e);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    if (user.user == "premium") {
      toast.warn("Already A prime member");
      return;
    }

    setShow(true);
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_yWZnCopCzsa76e",
      amount: data.amount,
      email: user.email,
      currency: data.currency,
      name: month + " Month Plan",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        response["email"] = user.email;
        response["amount"] = data.amount;
        response["tenure"] = month;

        try {
          const verifyUrl = "http://localhost:4000/api/verify";
          const { data } = await axios.post(verifyUrl, response);

          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: user.email,
              token: user.token,
              id: user.id,
              user: "premium",
              name: user.name,
              image: user.image,
              distance: user.dist,
            },
          });
          setSub("premium");
          window.localStorage.setItem("user", "premium");

          setShow(false);

          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:4000/api/order";

      var amount = 0;
      if (month == 1) amount = 60;
      else if (month == 3) amount = 170;
      else if (month == 6) amount = 330;
      else amount = 650;

      const { data } = await axios.post(orderUrl, { amount: amount, month });

      initPayment(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const [sub, setSub] = React.useState();

  useEffect(() => {
    axios
      .post("http://localhost:4000/api/get-user-profile", {
        email: user.email,
      })
      .then(function (response) {
        console.log("Response", response);
        if (response.data) {
          const data = response.data;
          setPref(data.preference);
          setValueAge(data.agePreference);
          setValue(data.distance / 1000);
        }
      })
      .catch(function (error) {
        toast.warn("Update Your Profile");
      });
  }, []);

  const handleUpdate = () => {
    axios
      .post("http://localhost:4000/api/update-profile", {
        preference: pref,
        email: user.email,
        agePreference: valueAge,
        distance: value * 1000,
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
                  max={500}
                />
              </div>
            </div>
            <div className="row p-3">
              <div className="col-md-6 mb-3">
                <h4 className="Language">Subscription</h4>
              </div>
              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-md-6 mb-1" style={{ margin: "auto" }}>
                    <FormControl sx={{ minWidth: 100 }} size="small">
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={sub}
                        label="Subscription"
                        onChange={(e) => handleSubscription(e.target.value)}
                        displayEmpty
                        disabled
                      >
                        <MenuItem value="">Free</MenuItem>
                        <MenuItem value="Premium">Premium</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-6 mb-1" style={{ margin: "auto" }}>
                    <Button variant="outlined" onClick={handleShow}>
                      {user.user == "free"
                        ? "Upgrade"
                        : "Already a Prime Member"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="" style={{ textAlign: "center" }}>
              <button
                className="SettingButton"
                type="button"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </section>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Premium Features</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>Super Like</li>
            <li>Undo</li>
          </ol>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={month}
              label="Subscription"
              onChange={(e) => handleMonth(e.target.value)}
              displayEmpty
            >
              <MenuItem value="1">1 Month (₹60)</MenuItem>
              <MenuItem value="3">3 Month (₹170)</MenuItem>
              <MenuItem value="6">6 Month (₹330)</MenuItem>
              <MenuItem value="12">12 Month (₹650)</MenuItem>
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
      <BottomDrawer />
    </div>
  );
}
