const express = require("express");
const {authCheck,profileCheck}  = require("../middlewares/auth");
const {sendMessage ,allMessages} = require("../controller/messageControllers")
const router = express.Router();

router.route("/chat/message").post(profileCheck,sendMessage)
router.route("/chat/message/:chatId").get(profileCheck,allMessages)

module.exports = router;
