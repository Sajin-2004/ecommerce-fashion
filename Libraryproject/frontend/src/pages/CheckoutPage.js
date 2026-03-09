import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const CheckoutPage = ({ setPage, setShowPopup }) => {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);
    const subtotal = getCartTotal();
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user ? user._id : null;

            const orderPayload = {
                userId,
                products: cart.map(item => ({
                    productId: item.productId,
                    brand: item.brand,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalPrice: total,
                address: formData,
                paymentMethod,
                orderDate: new Date()
            };

            // Call the new v2 API
            await axios.post("http://localhost:5000/api/orders/v2/create", orderPayload);

            setShowPopup(true);
            clearCart();
            setPage("home");
        } catch (err) {
            console.error("Order error:", err);
            alert("Error placing order. Please try again.");
        }
    };

    if (cart.length === 0) {
        return <div className="checkout-container"><h2>Your cart is empty</h2><button onClick={() => setPage("home")}>Go Shopping</button></div>;
    }

    return (
        <div className="checkout-container" style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <div style={{ flex: 2, minWidth: "300px" }}>
                <h2>1️⃣ Delivery Address</h2>
                <form onSubmit={placeOrder} className="auth-form" style={{ marginTop: "20px" }}>
                    <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
                    <input type="text" name="phone" placeholder="Phone" required onChange={handleChange} />
                    <textarea
                        name="address"
                        placeholder="Address"
                        required
                        onChange={handleChange}
                        style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "80px" }}
                    ></textarea>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="text" name="city" placeholder="City" required onChange={handleChange} style={{ flex: 1 }} />
                        <input type="text" name="state" placeholder="State" required onChange={handleChange} style={{ flex: 1 }} />
                    </div>
                    <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} />

                    <h2 style={{ marginTop: "30px" }}>3️⃣ Payment Method</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "15px 0" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                            <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
                            Cash on Delivery
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                            <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} />
                            UPI
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                            <input type="radio" value="Card" checked={paymentMethod === "Card"} onChange={(e) => setPaymentMethod(e.target.value)} />
                            Card
                        </label>
                    </div>

                    <button type="submit" className="order-btn" style={{ width: "100%", padding: "15px", fontSize: "18px" }}>
                        Place Order
                    </button>
                </form>
            </div>

            <div style={{ flex: 1, minWidth: "250px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", height: "fit-content" }}>
                <h2>2️⃣ Order Summary</h2>
                <div style={{ marginTop: "20px" }}>
                    {cart.map((item) => (
                        <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                            <span>{item.brand} (x{item.quantity})</span>
                            <span>₹{item.price * item.quantity}</span>
                        </div>
                    ))}
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <span>Subtotal:</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                        <span>Delivery:</span>
                        <span>₹{deliveryFee}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontWeight: "bold", fontSize: "1.2rem", color: "#2874f0" }}>
                        <span>Total:</span>
                        <span>₹{total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
