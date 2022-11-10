const express = require("express");
const router = express.Router();

const {getSuperLike,makeSuperLike,getLike} = require("../controller/likes");
const {tokenVerifier} = require("../middlewares/auth")




// Route to send Super Like
router.post("/make-super-like",tokenVerifier,makeSuperLike);

//Route to fetch Super Like if user have
router.post("/get-super-like",tokenVerifier,getSuperLike);

//Route to get Likes user get from someone 
router.post("/get-likes",tokenVerifier,getLike)



module.exports = router;