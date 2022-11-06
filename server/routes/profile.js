const express = require("express");
const router = express.Router();
const {profileCheck}  = require("../middlewares/auth");
const {allProfile,updateProfile,fetchProfile,fetchProfileId} = require("../controller/profile");



router.post("/all-profile",profileCheck,allProfile);


router.post("/update-profile",profileCheck,updateProfile);


router.post("/get-user-profile",profileCheck,fetchProfile);



router.post("/get-profile-id",fetchProfileId);




module.exports = router;