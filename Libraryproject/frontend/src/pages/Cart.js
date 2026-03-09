import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart({ setShowPopup, setPage }) {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getCartTotal } = useContext(CartContext);

  const handleOrder = () => {
    setPage("checkout");
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.image} alt={item.brand} width="80" />

          <div style={{ flex: 1 }}>
            <h4>{item.brand}</h4>
            <p>₹{item.price}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => decreaseQuantity(item.productId)} style={{ padding: "5px 10px" }}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.productId)} style={{ padding: "5px 10px" }}>+</button>
          </div>

          <h4 style={{ marginLeft: "20px" }}>₹{item.price * item.quantity}</h4>

          <button onClick={() => removeFromCart(item.productId)} style={{ marginLeft: "20px", background: "red", color: "white" }}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: "30px", padding: "20px", borderTop: "2px solid #ddd" }}>
          <h3>Order Summary</h3>
          <p>Subtotal: ₹{getCartTotal()}</p>
          <p>Delivery Charges: ₹0</p>
          <h2>Total Price: ₹{getCartTotal()}</h2>

          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            <button onClick={() => setPage("home")} style={{ padding: "10px 20px", cursor: "pointer" }}>
              Continue Shopping
            </button>
            <button className="order-btn" onClick={handleOrder}>
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;