const express = require("express");
const router = express.Router();
const {makePost,getAuthor} = require("../controller/post");




router.post("/make-post",makePost)

router.post("/get-author",getAuthor)


module.exports = router;
