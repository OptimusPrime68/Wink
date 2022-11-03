const express = require("express");
const router = express.Router();
const {authCheck,profileCheck}  = require("../middlewares/auth");
const {login,signup,getUserType,deleteAccount,googleLogin} = require("../controller/auth");



router.post("/login",authCheck,login);

router.post("/google-login",authCheck,googleLogin);

router.post("/signup",authCheck,signup);

router.post("/is-premium",authCheck,getUserType);




router.post("/delete-account",authCheck,deleteAccount);



module.exports = router;