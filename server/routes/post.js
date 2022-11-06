const express = require("express");
const router = express.Router();
const {makePost,getAuthor,getAllPost} = require("../controller/post");




router.post("/make-post",makePost)

router.post("/get-author",getAuthor)

router.post("/get-all-post",getAllPost);


module.exports = router;
