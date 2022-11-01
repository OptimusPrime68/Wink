const express = require("express");
const router = express.Router();
const {paymentCheck}  = require("../middlewares/payment");
const {makeOrder,makePayment} = require("../controller/payment");



router.post("/order",paymentCheck,makeOrder);
router.post("/verify",paymentCheck,makePayment);



module.exports = router;