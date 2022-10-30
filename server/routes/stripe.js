const express = require('express');
const router = express.Router();

const {createPaymentIntent} = require("../controller/stripe");

const {authCheck} = require("../middlewares/stripe");

router.post("/create-payment-intent",authCheck,createPaymentIntent);



module.exports = router;