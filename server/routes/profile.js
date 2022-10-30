const express = require("express");
const router = express.Router();
const {profileCheck}  = require("../middlewares/auth");
const {allProfile} = require("../controller/profile");



router.post("/all-profile",allProfile);


module.exports = router;