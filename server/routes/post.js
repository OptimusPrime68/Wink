const express = require("express");
const router = express.Router();
const {tokenVerifier} = require("../middlewares/auth");
const {makePost,getAuthor,getAllPost,deletePost,updateLike,getPostById} = require("../controller/post");


// Route to create Post
router.post("/make-post",tokenVerifier,makePost)

// Route to get Author of Post
router.post("/get-author",getAuthor)

// Route to get All Post to show in news feed of user and thier matches
router.post("/get-all-post",tokenVerifier,getAllPost);

// ROute to delete Post
router.post("/delete-post",deletePost);

router.post("/update-like",updateLike)

router.post("/get-post-by-id",tokenVerifier,getPostById)


module.exports = router;
