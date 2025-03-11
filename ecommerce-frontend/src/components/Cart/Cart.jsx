import React from "react";
import { useCart } from "../../context/CartContext.jsx"; 
import "./Cart.css";  // Import the CSS file

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart(); 

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
