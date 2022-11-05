const express = require("express");

const {authCheck}  = require("../middlewares/auth");
const {accessChat,
    fetchChats
} = require("../controller/chatControllers");

const router = express.Router();

router.route("/chat").post(authCheck,accessChat)
router.route("/chat/all").post(authCheck,fetchChats);


module.exports= router;