const express = require("express");
const {authCheck}  = require("../middlewares/auth");
const {sendMessage ,allMessages} = require("../controller/messageControllers")
const router = express.Router();

router.route("/chat/message").post(authCheck,sendMessage)
router.route("/chat/message/:chatId").get(authCheck,allMessages)

module.exports = router;
