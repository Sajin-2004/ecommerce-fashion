import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

const CartPage = ({ setPage }) => {
    const { cart, getCartTotal } = useContext(CartContext);
    const subtotal = getCartTotal();
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <p>Your cart is empty.</p>
                    <button onClick={() => setPage("home")}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cart-items-list">
                        {cart.map((item) => (
                            <CartItem key={item.productId} item={item} />
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Fee:</span>
                            <span>₹{deliveryFee}</span>
                        </div>
                        <div className="summary-row" style={{ borderTop: "1px solid #ddd", paddingTop: "10px" }}>
                            <h2>Total:</h2>
                            <h2>₹{total}</h2>
                        </div>

                        <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end", marginTop: "20px" }}>
                            <button
                                onClick={() => setPage("home")}
                                style={{ backgroundColor: "#f5f5f5", color: "#333", border: "1px solid #ccc" }}
                            >
                                Continue Shopping
                            </button>
                            <button
                                className="order-btn"
                                onClick={() => setPage("checkout")}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
