const express = require("express");
const router = express.Router();
const {profileCheck}  = require("../middlewares/auth");
const {getMatch,makeMatch} = require("../controller/match");



// Route to find all Matches of user
router.post("/all-match",profileCheck,getMatch);


// Route to send a Match Request
router.post("/make-match",profileCheck,makeMatch);


module.exports = router;