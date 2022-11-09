const express = require("express");
const router = express.Router();
const {profileCheck,tokenVerifier}  = require("../middlewares/auth");
const {allProfile,updateProfile,fetchProfile,fetchProfileId} = require("../controller/profile");


// Route to fetch all profile based on filters
router.post("/all-profile",tokenVerifier,allProfile);

// Route to Update Profile
router.post("/update-profile",tokenVerifier,updateProfile);

// Route to fetch User Profile
router.post("/get-user-profile",tokenVerifier,fetchProfile);


//Route to get Profile Id from email
router.post("/get-profile-id",tokenVerifier,fetchProfileId);




module.exports = router;