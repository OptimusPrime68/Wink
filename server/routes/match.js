const express = require("express");
const router = express.Router();
const {profileCheck,tokenVerifier}  = require("../middlewares/auth");
const {getMatch,makeMatch,getMatchDetails} = require("../controller/match");



// Route to find all Matches of user
router.post("/all-match",tokenVerifier,getMatch);

router.post("/all-match-details",tokenVerifier,getMatchDetails);


// Route to send a Match Request
router.post("/make-match",profileCheck,makeMatch);


module.exports = router;