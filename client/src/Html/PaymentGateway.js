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

  const getSellerName = async (sellerID) => {
      const json5 = JSON.stringify({ "id": sellerID });
      const response5 = await fetch("http://localhost:3000/api/getUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json5,
      });
      const data5 = await response5.json();
    if (data5.status === "ok") {
      return data5.data.name;
    }
      else {
        return "";
    }
      
  } 

  const confirmPayment2 = async (stripe) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const userID = user.id;
    const store = JSON.parse(localStorage.getItem("store"));
    if (localStorage.getItem("orderType") == "event") {
      let product;
      const sellerID = localStorage.getItem("orderToId");
      for (let i = 0; i < store.length; i++) {
        let item = store[i];
        if (item._id == localStorage.getItem("productTempId")) {
          product = item;
          break;
        }
      }
      const json5 = JSON.stringify({ "id": sellerID });
      const response5 = await fetch("http://localhost:3000/api/getUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json5,
      });
      const data5 = await response5.json();
      if (data5.status === "ok") {
      const sellerName = data5.data.name;
      const eventName = product.name;
      const OrderType = "Event";
      const amount = parseFloat(product.price);
      const json2 = JSON.stringify({ "userID": userID });
      const response = await fetch("http://localhost:3000/api/getShippingAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        const shippingAddressID = data.data._id;
        const json3 = JSON.stringify({
          OrderType, userID, sellerID, amount, shippingAddressID, eventName, sellerName
        });
        const response2 = await fetch("http://localhost:3000/api/createOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: json3,
        });
        const data2 = await response2.json();
        if (data2.status != "ok") {
          MySwal("error", "Error Occurred! Try Again!", 1000);
          return;
        }
      }
    }
    }
    else if (localStorage.getItem("orderType") == "product") {
      const cart = JSON.parse(localStorage.getItem("cart2"));
      const json2 = JSON.stringify({ "userID": userID });
      const response = await fetch("http://localhost:3000/api/getShippingAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        const shippingAddressID = data.data._id;
        for (let i = 0; i < cart.length; i++) {
          let product = cart[i];
          const sellerID = product.userID;
          const OrderType = "Product";
          const amount = parseFloat(product.price);
          const items = product.name;
          const quantities = product.amount;
          const perItemAmount = amount;
          const sellerName = await getSellerName(sellerID);
          console.log(sellerName);
          const json3 = JSON.stringify({
          OrderType, userID, sellerID, amount, shippingAddressID, sellerName, items,quantities, perItemAmount
          });
          const response2 = await fetch("http://localhost:3000/api/createOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: json3,
          });
          const json4 = JSON.stringify({ "id": product._id, "amount": product.amount });
          const response3 = await fetch("http://localhost:3000/api/deductProductQuantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: json4,
          });
          const data2 = await response2.json();
          const data3 = await response3.json();
        if (data2.status != "ok") {
          MySwal("error", "Error Occurred! Try Again!", 1000);
          return;
        }
        }
      }
    //   if (data5.status === "ok") {
    //   const sellerName = data5.data.name;
    //   const eventName = product.name;
    //   const OrderType = "Event";
    //   const amount = parseFloat(product.price);
    //   const json2 = JSON.stringify({ "userID": userID });
    //   const response = await fetch("http://localhost:3000/api/getShippingAddress", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: json2,
    //   });
    //   const data = await response.json();
    //   if (data.status === "ok") {
    //     const shippingAddressID = data.data._id;
    //     const json3 = JSON.stringify({
    //       OrderType, userID, sellerID, amount, shippingAddressID, eventName, sellerName
    //     });
    //     const response2 = await fetch("http://localhost:3000/api/createOrder", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: json3,
    //     });
    //     const data2 = await response2.json();
    //     if (data2.status != "ok") {
    //       MySwal("error", "Error Occurred! Try Again!", 1000);
    //       return;
    //     }
    //   }
    // }
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/",
      },
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    if (!stripe || !elements) {
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    MySwal("success", "Payment Successful", 1500);
    setTimeout(() => {
      confirmPayment2(stripe);
    }, 500);
    
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