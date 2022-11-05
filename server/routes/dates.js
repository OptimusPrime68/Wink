const express = require("express");
const router = express.Router();

const {makeDate,getDate,removeDate,getSuperLike,makeSuperLike} = require("../controller/date");

router.post("/make-date",makeDate);


router.post("/get-date",getDate);

router.post("/remove-date",removeDate);


router.post("/make-super-like",makeSuperLike);


router.post("/get-super-like",getSuperLike);




module.exports = router;