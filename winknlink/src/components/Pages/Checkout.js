import React, { useEffect, useState } from "react";
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import {useSelector,useDispatch} from 'react-redux'
import { createPaymentIntent } from "../stripe";

 const Checkout = () =>{
    const dispatch = useDispatch();


    const [succeeded,setSucceeded] = useState(false);

    const [error,seterror] = useState(null);

    const [processing,setprocessing] = useState('');

    const [disabled,setdisabled] = useState(true);

    const [clientSecret,setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();


    let {user} = useSelector((state)=>({...state}));


    useEffect(()=>{

        const authToken = window.localStorage.getItem("token");
        createPaymentIntent(authToken).then((res)=>{
           console.log(res);
           console.log("Create payment intent",res.data);
           setClientSecret(res.data.clientSecret);
            
        })
    },[]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setprocessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name:e.target.name.value,
                    
                }
            }
        })

        if(payload.error){
           seterror("Payment Failed");
           console.log(payload.error)
           setprocessing(false);
        }else{

            console.log(JSON.stringify(payload,null,4))
            seterror(null);
            setprocessing(false);
            setSucceeded(true);
        }

    }

    const handleChange= async (e) =>{
        setdisabled(e.empty);
        seterror(e.error?e.error.message:"");
    }



    const cartStyle = { style: { base: { color: "#32325d", fontFamily: "Arial, sans-serif", fontSmoothing: "antialiased", fontSize: "16px", "::placeholder": { color: "#32325d", }, }, invalid: { color: "#fa755a", iconColor: "#fa755a", }, }, };


    return (
        <>
        <form id = "payment-form" className="stripe-form"
        onSubmit={handleSubmit}
        >
            <CardElement id = "card-element" options={cartStyle} 
            onChange={handleChange}
            />

            <button className="stripe-button" disabled={processing || disabled || succeeded}>
                <span id = "button-text">{processing ? <div className="spinnner" id = "spinner">


                </div>:"Pay"}</span>
            </button>

        </form>
        {error && <h1>{error}</h1>}
        </>
    )

}


export default Checkout;