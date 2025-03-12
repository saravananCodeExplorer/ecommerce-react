import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext.jsx";
import "./Payment.css";

const Payment = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!name || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    setLoading(true);

    try {
      // Prepare payload (Note: Never send sensitive card details to your own server in production)
      const paymentPayload = {
        name,
        cardNumber,
        expiry,
        cvv,
        totalAmount,
        // Additional order details can be added here
      };

      // Call backend payment endpoint (simulate payment processing)
      const response = await axios.post("http://localhost:5000/payment", paymentPayload);
      
      if (response.data.success) {
        setSuccessMessage("Payment Successful! Thank you for shopping.");
        clearCart();
        // Reset form fields
        setName("");
        setCardNumber("");
        setExpiry("");
        setCvv("");
      } else {
        setSuccessMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setSuccessMessage("An error occurred. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="payment-container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add items before proceeding to payment.</p>
      ) : (
        <>
          <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          <form onSubmit={handlePayment} className="payment-form">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
              required
            />
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              required
            />
            <button type="submit" className="pay-btn" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </>
      )}
    </div>
  );
};

export default Payment;
