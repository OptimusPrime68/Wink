const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Subscription = require("../models/subscription");

// FUNCTION TO CREATE ORDER
exports.makeOrder= async (req,res)=>{

    try {
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_SECRET_ID,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}

}

// FUNCTION TO MAKE PAYMENT
exports.makePayment=async (req,res)=>{

    console.log(req.body);
    console.log(req.headers);
    try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
        const email = req.body.email;
        const payment = req.body.payment;
        const tenure =req.body.tenure;

		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_HASH_KEY)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {


            const subs = new Subscription({
                email,charge:payment,date_of_joining:new Date(),tenure,order_id:razorpay_order_id,
            });
            const data = await Subscription.create(subs);

            console.log(data);

            

        if(data)    
		return res.status(200).json({ message: "Payment verified successfully" });
        else
        return res.status(400).json({ message: "Payment Success but saving Failed | Refund Will be initiated soon" });
		} else 
			return res.status(400).json({ message: "Invalid signature sent!" });
		
	} catch (error) {
        console.log(error.message);
		res.status(500).json({ id: error.message });
		
	}
}
