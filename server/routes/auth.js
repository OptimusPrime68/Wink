const express = require("express");
const router = express.Router();
const {authCheck,profileCheck}  = require("../middlewares/auth");
const {login,signup,updateProfile} = require("../controller/auth");



router.get("/login",authCheck,login);

router.post("/signup",authCheck,signup);


router.get("/update-profile",profileCheck,updateProfile);




module.exports = router;