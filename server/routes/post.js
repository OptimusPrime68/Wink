const express = require("express");
const router = express.Router();
const {makePost,getAuthor,getAllPost} = require("../controller/post");



// Route to create Post
router.post("/make-post",makePost)

// Route to get Author of Post
router.post("/get-author",getAuthor)

// Route to get All Post to show in news feed of user and thier matches
router.post("/get-all-post",getAllPost);


module.exports = router;
