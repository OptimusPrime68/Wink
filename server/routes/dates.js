const express = require("express");
const router = express.Router();

const {makeDate,getDate,removeDate} = require("../controller/date");

router.post("/make-date",makeDate);


router.post("/get-date",getDate);

router.post("/remove-date",removeDate);



module.exports = router;