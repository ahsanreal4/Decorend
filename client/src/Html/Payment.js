import React,{useEffect , useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentGateway from './PaymentGateway';
import MySwal from '../AlertModel/MySwal';

const stripePromise = loadStripe('pk_test_51L28mhLptjUB1MRMviKNTRHn54dV7xrjOPqJuuf6PsPuYrV5HuwajnEd6n5ztnf0CgiDMX8ARpaOtHnXrr75bD3n00vCr0r484');

export default function Payment() {
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
      try {
        if (localStorage.getItem("paymentProcessing") != null) {
          localStorage.removeItem("paymentProcessing");
          localStorage.removeItem("imagesUrl");
          localStorage.removeItem("cart");
          fetch("http://localhost:3000/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
          })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch(() => document.querySelector("#pay_btn").disabled = false);
        }
        else {
          window.location.href = "/";
        }
        }
      catch (error) {
          MySwal("error", "Error while processing payment", 1500);
        }
    
      
    }, []);
    const appearance = {
      theme: 'stripe',
    };
    const options = {
    // passing the client secret obtained from the server
      clientSecret,
      appearance,
  };
  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentGateway />
        </Elements>
      )}
  </div>
  )
}
