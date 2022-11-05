const express = require("express");
const router = express.Router();

const {makeDate,getDate} = require("../controller/date");

router.post("/make-date",makeDate);


router.post("/get-date",getDate);



module.exports = router;