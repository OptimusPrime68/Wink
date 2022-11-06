const express = require("express");
const router = express.Router();
const {makeSos,makeCall} = require("../controller/sos");

router.post("/messages",makeSos)

router.post("/call",makeCall);

module.exports = router;


