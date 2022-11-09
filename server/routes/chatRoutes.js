const express = require("express");

const {authCheck, profileCheck}  = require("../middlewares/auth");
const {accessChat,
    fetchChats
} = require("../controller/chatControllers");
const profile = require("../models/profile");

const router = express.Router();

router.route("/chat").post(profileCheck,accessChat)
router.route("/chat/all").post(profileCheck,fetchChats);


module.exports= router;