const express = require("express");
const router = express.Router();
const {paymentCheck}  = require("../middlewares/payment");
const {makeOrder,makePayment} = require("../controller/payment");



// Route to create Order
router.post("/order",paymentCheck,makeOrder);

// Route to verify Payment
router.post("/verify",paymentCheck,makePayment);



module.exports = router;