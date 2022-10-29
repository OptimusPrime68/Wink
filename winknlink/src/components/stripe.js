import axios from 'axios'

export const createPaymentIntent = (authToken) =>

    axios.post("http://localhost:4000/api/create-payment-intent", {},{
           headers:{
            authToken,
          },
        }
    );