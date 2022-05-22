import React, { Fragment, useEffect, useState } from "react";


// import MetaData from "../layout/MetaData";
// import CheckoutSteps from "./CheckoutSteps";

import  MySwal  from "../AlertModel/MySwal";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors } from "../../actions/orderActions";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

// import axios from "axios";
 

const PaymentGateway = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    
  const options = {
    style: {
      base: {
        fontSize: "16px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const user = localStorage.getItem("userData");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/paymentSuccessful",
      },
    });
    
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    setIsLoading(false);
  };

//   useEffect(() => {
//     // if (error) {
//     //   // MySwal("error", error, 1500);
//     //   // dispatch(clearErrors());
//     // }
//   }, []);

//   const paymentData = {
//     amount: Math.round(donateAmount * 100),
//   };
//   const backendamount = {
//     amount: Math.round(donateAmount * 1),
//   };
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     document.querySelector("#pay_btn").disabled = true;
//     //trt
//     let money;
//     try {
//       const config = {

        
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       // money = await axios.post("/api/v1/payment/money", backendamount, config);
//     } catch (error) {
//       document.querySelector("#pay_btn").disabled = false;
//       MySwal("error", error.response.data.message, 1500);
//       // alert.error(error.response.data.message);
//     }
//     //try

//     let res;
//     try {
//       // const config = {
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       // };
//       let json2 = JSON.stringify({ "amount": Math.round(donateAmount * 100) });
//       // res = await axios.post("/api/v1/payment/process", paymentData, config);
//       res = await fetch("http://localhost:3000/api/getStripePaymentSecretKey", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       const clientSecret = res.data.client_secret;

//       console.log(clientSecret);

//       if (!stripe || !elements) {
//         return;
//       }

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             name: user.name,
//             email: user.email,
//           },
//         },
//       });

//       if (result.error) {
//         // alert.error(result.error.message);
//         MySwal("error", result.error.message, 1500);
//         document.querySelector("#pay_btn").disabled = false;
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           MySwal("error", "Payment Successful!", 1500);
//           // alert.success("You have successfully Donate Money");

//           setTimeout(() => window.location.href = "/", 1500);
//         } else {
//           MySwal("error", "Some error occurred while processing payment!", 1500);
//           // alert.error("There is some issue while payment processing");
//         }
//       }
//     } catch (error) {
//       document.querySelector("#pay_btn").disabled = false;
//       MySwal("error", error, 1500);
//       // alert.error(error.response.data.message);
//     }
//   };

  return (

    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentGateway;