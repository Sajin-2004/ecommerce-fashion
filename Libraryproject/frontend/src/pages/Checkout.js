import React, { useState, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { CartContext } from "../context/CartContext";

function Checkout({ product, setPage, setShowPopup }) {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);

    // Form state
    const [address, setAddress] = useState({
        name: "",
        mobile: "",
        addressLine: "",
        city: "",
        pincode: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("COD");

    // Determine which items we are checking out (Buy Now directly vs Cart)
    const checkoutItems = product ? [product] : cart;
    const checkoutTotal = product ? product.price : getCartTotal();

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const orderPayload = {
                products: checkoutItems.map(item => ({
                    productId: item.productId || item._id,
                    price: item.price,
                    quantity: item.quantity || 1
                })),
                totalPrice: checkoutTotal,
                address,
                paymentMethod
            };

            await axios.post(`${API_BASE_URL}/api/orders`, orderPayload, { headers });

            // Show Success Modal
            setShowPopup(true);

            // Clear Context Cart if we checked out from cart
            if (!product) {
                clearCart();
            }

            // Go back Home
            setPage("home");

        } catch (err) {
            console.error("Order failed", err);
            alert("Could not place order");
        }
    };

    if (checkoutItems.length === 0) {
        return <h2>No products selected for checkout.</h2>;
    }

    return (
        <div className="checkout-container" style={{ display: "flex", gap: "30px", padding: "40px" }}>

            {/* LEFT COLUMN: Form */}
            <div style={{ flex: 2 }}>
                <h2>Checkout</h2>
                <form onSubmit={placeOrder} className="auth-form" style={{ marginTop: "20px" }}>

                    <h3>1. Delivery Address</h3>
                    <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                    <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
                    <textarea name="addressLine" placeholder="Street Address" rows="3" required onChange={handleChange} style={{ padding: "10px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }}></textarea>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="text" name="city" placeholder="City" required onChange={handleChange} style={{ flex: 1 }} />
                        <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} style={{ flex: 1 }} />
                    </div>

                    <h3 style={{ marginTop: "20px" }}>2. Payment Method</h3>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
                        <label>
                            <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
                        </label>
                        <label>
                            <input type="radio" value="CARD" checked={paymentMethod === "CARD"} onChange={(e) => setPaymentMethod(e.target.value)} /> Credit / Debit Card
                        </label>
                        <label>
                            <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} /> UPI
                        </label>
                    </div>

                    <button type="submit" className="order-btn" style={{ width: "100%", padding: "15px", fontSize: "16px" }}>
                        Place Order
                    </button>
                </form>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div style={{ flex: 1, border: "1px solid #ddd", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9", height: "fit-content" }}>
                <h3>Order Summary</h3>
                <hr style={{ margin: "15px 0" }} />

                {checkoutItems.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <div>
                            <p style={{ margin: 0, fontWeight: "bold" }}>{item.brand}</p>
                            <small>Qty: {item.quantity || 1}</small>
                        </div>
                        <p style={{ margin: 0 }}>₹{item.price * (item.quantity || 1)}</p>
                    </div>
                ))}

                <hr style={{ margin: "15px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Subtotal</p>
                    <p>₹{checkoutTotal}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Delivery Charges</p>
                    <p style={{ color: "green" }}>FREE</p>
                </div>
                <hr style={{ margin: "15px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "bold" }}>
                    <p>Total</p>
                    <p>₹{checkoutTotal}</p>
                </div>
            </div>

        </div>
    );
}

export default Checkout;