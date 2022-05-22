import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentGateway from './PaymentGateway';

const stripePromise = loadStripe('pk_test_51L28mhLptjUB1MRMviKNTRHn54dV7xrjOPqJuuf6PsPuYrV5HuwajnEd6n5ztnf0CgiDMX8ARpaOtHnXrr75bD3n00vCr0r484');
export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
        <PaymentGateway />
    </Elements>
  )
}
