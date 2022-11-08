const express = require("express");
const router = express.Router();

const {getSuperLike,makeSuperLike,getLike} = require("../controller/likes");




// Route to send Super Like
router.post("/make-super-like",makeSuperLike);

//Route to fetch Super Like if user have
router.post("/get-super-like",getSuperLike);

//Route to get Likes user get from someone 
router.post("/get-likes",getLike)



module.exports = router;