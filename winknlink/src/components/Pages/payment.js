import React from "react";
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js';
import Checkout from './Checkout'
import "../../stripe.css"

const promise = loadStripe("pk_test_51LxxJ0SJNG7fDQtVMzRb7gA8b9CpwTr85aRxRD77ILodoUcZJId4mOyy9fj0RASlvbbIFBCgwfHE2UElNVlPsduP00vBGa5TpT");




const Payment = () => {


 

  return (
    <>

     <h4>Complete your purchase</h4>
     <Elements stripe={promise}>     
          <h1>
        <Checkout/>
      </h1>
      </Elements>

    </>
  );
};

export default Payment;
