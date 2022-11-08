const express = require("express");
const router = express.Router();
const {makeSos,makeCall} = require("../controller/sos");

//Route For Sending SOS Message
router.post("/messages",makeSos)

//Route For  SOS Call
router.post("/call",makeCall);

module.exports = router;


