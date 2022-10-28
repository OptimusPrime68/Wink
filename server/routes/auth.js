const express = require("express");
const router = express.Router();
const {authCheck,profileCheck}  = require("../middlewares/auth");
const {login,signup,updateProfile,fetchProfile} = require("../controller/auth");



router.post("/login",authCheck,login);

router.post("/signup",authCheck,signup);


router.post("/update-profile",profileCheck,updateProfile);


router.post("/get-user-profile",profileCheck,fetchProfile);




module.exports = router;