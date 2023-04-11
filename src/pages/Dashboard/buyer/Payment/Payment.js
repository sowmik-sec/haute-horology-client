import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import useTitle from "../../../../hooks/useTitle";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  useTitle("Payment");
  const orderInfo = useLoaderData();
  const { price, model } = orderInfo;
  console.log(orderInfo);
  return (
    <div>
      <h3 className="text-3xl">
        Pay ${price} for {model}
      </h3>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm orderInfo={orderInfo} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
