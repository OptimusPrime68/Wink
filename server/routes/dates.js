const express = require("express");
const router = express.Router();

const {makeDate,getDate,removeDate,getSuperLike,makeSuperLike} = require("../controller/date");


// Route to create Date
router.post("/make-date",makeDate);


// Route to fetch Date
router.post("/get-date",getDate);



// Route to delete Date
router.post("/remove-date",removeDate);






module.exports = router;