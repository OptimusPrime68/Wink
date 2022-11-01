import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/landingPage.css";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";


const Plan = () => {


    let { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    if (!user) navigate("/");

    let email,tenure = 3;
  
    if (user) email = user.email;

	
	const initPayment = (data) => {
		const options = {
			key: "rzp_test_yWZnCopCzsa76e",
			amount: data.amount,
			currency: data.currency,
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {

        response['email'] = email;
        response['amount'] = data.amount;
        response['tenure'] = tenure;

				try {
					const verifyUrl = "http://localhost:4000/api/verify";
					const { data } = await axios.post(verifyUrl,response);
					console.log(data);
				}catch (error) {
					console.log(error);
				}},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:4000/api/order";
			const { data } = await axios.post(orderUrl, { amount: 200});
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};
  



  

return(
  <>
  
  <button onClick={handlePayment}>Buy Now</button>

  </>
)

}


export default Plan;