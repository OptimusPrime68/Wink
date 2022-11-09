const express = require("express");
const router = express.Router();
const { authCheck, profileCheck,loginCheck } = require("../middlewares/auth");
const {
  login,
  signup,
  getUserType,
  deleteAccount,
  googleLogin,
  forgotPassword,
} = require("../controller/auth");



// Route to Login
router.post("/login", loginCheck, login);


// Route to google login
router.post("/google-login", authCheck, googleLogin);


// Route to create user
router.post("/signup", authCheck, signup);



// Route to make user premium
router.post("/is-premium", getUserType);


// Route to delete account
router.post("/delete-account", deleteAccount);


// Forgot Password API

router.post("/forgot-password",authCheck,forgotPassword)

module.exports = router;
