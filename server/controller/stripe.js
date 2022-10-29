const User = require("../models/user");
const stripe = require('stripe')("sk_test_51LxxJ0SJNG7fDQtVbPX2scxErcQp5LmjXY4FNeh5DZg1UJXsgUgehv1tlI65kVY21qexkrpD5VX0FRKI1PILtf4j00tY2Iqahk")


exports.createPaymentIntent = async(req,res) =>{


    const paymentIntent = await stripe.paymentIntents.create({
        amount:100,
        currency:'usd',
    })

    console.log("aaa");
    res.send({
        clientSecret:paymentIntent.client_secret,
    })
}