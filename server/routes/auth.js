const express = require("express");
const router = express.Router();
const { authCheck, profileCheck } = require("../middlewares/auth");
const {
  login,
  signup,
  getUserType,
  deleteAccount,
  googleLogin,
} = require("../controller/auth");



// Route to Login
router.post("/login", authCheck, login);


// Route to google login
router.post("/google-login", authCheck, googleLogin);


// Route to create user
router.post("/signup", authCheck, signup);



// Route to make user premium
router.post("/is-premium", getUserType);


// Route to delete account
router.post("/delete-account", deleteAccount);

module.exports = router;
