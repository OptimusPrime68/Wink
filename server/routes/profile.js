const express = require("express");
const router = express.Router();
const {profileCheck}  = require("../middlewares/auth");
const {allProfile,updateProfile,fetchProfile} = require("../controller/profile");



router.post("/all-profile",profileCheck,allProfile);


router.post("/update-profile",profileCheck,updateProfile);


router.post("/get-user-profile",profileCheck,fetchProfile);


module.exports = router;