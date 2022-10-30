const express = require("express");
const router = express.Router();
const {profileCheck}  = require("../middlewares/auth");
const {getMatch,makeMatch} = require("../controller/match");



router.post("/all-match",profileCheck,getMatch);

router.post("/make-match",profileCheck,makeMatch);


module.exports = router;