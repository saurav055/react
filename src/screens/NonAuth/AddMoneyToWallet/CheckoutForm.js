import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm({ setClientSecret, addTransaction }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const res = await stripe.confirmPayment({
      elements,

      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "https://glistenastrology.com/add_money",
      },
      redirect: "if_required",
    });
    if (res.paymentIntent?.status == "succeeded") {
      setClientSecret("");
      addTransaction();
    }
    console.log(res);
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (
      res.error.type === "card_error" ||
      res.error.type === "validation_error"
    ) {
      setMessage(res.error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form className={[styles.form]} onSubmit={handleSubmit}>
      <PaymentElement className={styles.payment_element} />
      <button
        disabled={isLoading || !stripe || !elements}
        className={[styles.button, styles.submit]}
      >
        <span className={styles.button_text}>
          {isLoading ? <div className={styles.spinner}></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div className={styles.payment_message}>{message}</div>}
    </form>
  );
}
