const express = require("express");
const router = express.Router();
const {profileCheck}  = require("../middlewares/auth");
const {allProfile,updateProfile,fetchProfile,fetchProfileId} = require("../controller/profile");


// Route to fetch all profile based on filters
router.post("/all-profile",profileCheck,allProfile);

// Route to Update Profile
router.post("/update-profile",profileCheck,updateProfile);

// Route to fetch User Profile
router.post("/get-user-profile",profileCheck,fetchProfile);


//Route to get Profile Id from email
router.post("/get-profile-id",fetchProfileId);




module.exports = router;