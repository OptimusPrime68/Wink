const express = require("express");
const router = express.Router();
const {authCheck,profileCheck}  = require("../middlewares/auth");
const {login,signup,updateProfile,fetchProfile,getUserType,deleteAccount} = require("../controller/auth");



router.post("/login",authCheck,login);

router.post("/signup",authCheck,signup);

router.post("/is-premium",authCheck,getUserType);


router.post("/update-profile",profileCheck,updateProfile);


router.post("/get-user-profile",profileCheck,fetchProfile);


router.post("/delete-account",authCheck,deleteAccount);



module.exports = router;