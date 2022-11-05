const express = require("express");
const router = express.Router();

const {getSuperLike,makeSuperLike,getLike} = require("../controller/likes");




router.post("/make-super-like",makeSuperLike);


router.post("/get-super-like",getSuperLike);


router.post("/get-likes",getLike)



module.exports = router;