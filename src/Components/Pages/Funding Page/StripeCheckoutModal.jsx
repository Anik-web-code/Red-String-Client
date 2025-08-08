import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const StripeCheckoutModal = ({ amount, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    if (!stripe || !card) return;

    try {
      const { data } = await axios.post(
        "https://blood-donating-website.onrender.com/create-payment-intent",
        { amount }
      );
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: "Donor",
          },
        },
      });

      if (result.error) {
        alert("Payment Failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        onClose();
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Donate ${amount}</h2>
        <CardElement className="p-3 border rounded mb-4" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeCheckoutModal;
