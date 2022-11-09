const express = require("express");
const router = express.Router();
const {tokenVerifier} = require("../middlewares/auth");
const {makeDate,getDate,removeDate,getSuperLike,makeSuperLike} = require("../controller/date");


// Route to create Date
router.post("/make-date",tokenVerifier,makeDate);


// Route to fetch Date
router.post("/get-date",tokenVerifier,getDate);



// Route to delete Date
router.post("/remove-date",tokenVerifier,removeDate);






module.exports = router;