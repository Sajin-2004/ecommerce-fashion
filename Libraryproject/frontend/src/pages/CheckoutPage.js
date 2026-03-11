import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutPayment from "../components/CheckoutPayment";
import "./CheckoutPage.css";
import "./CartPage.css"; // Reuse summary styles

const CheckoutPage = ({ setShowPopup }) => {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();

    const buyProduct = location.state?.buyProduct;
    const buyQuantity = location.state?.quantity || 1;

    const subtotal = buyProduct
        ? buyProduct.price * buyQuantity
        : getCartTotal();

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Summary, 3: Payment

    const itemsToDisplay = buyProduct
        ? [{ ...buyProduct, productId: buyProduct._id, quantity: buyQuantity }]
        : cart;

    // Price Details logic (same as PriceSummary)
    const totalItems = itemsToDisplay.reduce((acc, item) => acc + item.quantity, 0);
    const totalMRP = Math.round(subtotal / 0.7);
    const discount = totalMRP - subtotal;
    const deliveryCharges = subtotal > 500 ? 0 : 40;
    const finalAmount = subtotal + deliveryCharges;

    const handlePlaceOrder = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user ? user._id : null;

            const productsToOrder = itemsToDisplay.map(item => ({
                productId: item.productId || item._id,
                brand: item.brand,
                price: item.price,
                quantity: item.quantity
            }));

            const orderPayload = {
                userId,
                products: productsToOrder,
                totalPrice: finalAmount,
                address: address,
                paymentMethod: selectedPayment.toUpperCase(),
            };

            // ✅ FIXED: was /api/orders/v2/create (non-existent), now uses the correct route
            const res = await axios.post("http://localhost:5000/api/orders/create", orderPayload);

            if (res.status === 201 || res.data.message) {
                setShowPopup(true);
                if (!buyProduct) clearCart();
                navigate("/");
            }
        } catch (err) {
            console.error("Order error:", err.response?.data || err.message);
            alert("Error placing order. Please try again.");
        }
    };

    if (!buyProduct && cart.length === 0) {
        navigate("/cart");
        return null;
    }

    return (
        <div className="checkout-page-container">
            <div className="checkout-layout">
                {/* Left: Steps */}
                <div className="checkout-steps-section">

                    {/* Step 1: Address */}
                    <div className="checkout-step-card">
                        <div className={`step-header ${activeStep !== 1 ? 'inactive' : ''}`}>
                            <span className="step-number">1</span>
                            DELIVERY ADDRESS
                        </div>
                        {activeStep === 1 && (
                            <div className="step-content">
                                <CheckoutAddress
                                    address={address}
                                    setAddress={setAddress}
                                    onSave={() => setActiveStep(2)}
                                />
                            </div>
                        )}
                        {activeStep > 1 && (
                            <div className="step-content" style={{ padding: '10px 24px' }}>
                                <div style={{ fontWeight: 600 }}>{address.name}  {address.phone}</div>
                                <div style={{ fontSize: '14px', color: '#555' }}>{address.address}, {address.city} - {address.pincode}</div>
                                <button
                                    onClick={() => setActiveStep(1)}
                                    style={{ color: '#2874f0', border: 'none', background: 'none', cursor: 'pointer', padding: '10px 0', fontWeight: 'bold' }}
                                >
                                    CHANGE
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Order Summary */}
                    <div className="checkout-step-card">
                        <div className={`step-header ${activeStep !== 2 ? 'inactive' : ''}`}>
                            <span className="step-number">2</span>
                            ORDER SUMMARY
                        </div>
                        {activeStep === 2 && (
                            <div className="step-content">
                                {itemsToDisplay.map((item) => (
                                    <div key={item.productId} className="summary-item">
                                        <img src={item.image} alt={item.name} className="summary-img" />
                                        <div className="summary-details">
                                            <div className="name">{item.name}</div>
                                            <div style={{ fontSize: '12px', color: '#878787' }}>Qty: {item.quantity}</div>
                                            <div className="price">₹{item.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                                <button className="save-address-btn" onClick={() => setActiveStep(3)}>Continue</button>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Payment */}
                    <div className="checkout-step-card">
                        <div className={`step-header ${activeStep !== 3 ? 'inactive' : ''}`}>
                            <span className="step-number">3</span>
                            PAYMENT OPTIONS
                        </div>
                        {activeStep === 3 && (
                            <div className="step-content">
                                <CheckoutPayment
                                    selectedMethod={selectedPayment}
                                    setSelectedMethod={setSelectedPayment}
                                />
                                <button className="confirm-order-btn" onClick={handlePlaceOrder}>
                                    Confirm Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Price Details */}
                <div className="cart-summary-section">
                    <div className="cart-card price-summary-card">
                        <div className="summary-header">Price Details</div>
                        <div className="summary-body">
                            <div className="price-item">
                                <span>Price ({totalItems} items)</span>
                                <span>₹{totalMRP.toLocaleString()}</span>
                            </div>
                            <div className="price-item discount">
                                <span>Discount</span>
                                <span>- ₹{discount.toLocaleString()}</span>
                            </div>
                            <div className="price-item">
                                <span>Delivery Charges</span>
                                <span>{deliveryCharges === 0 ? <span style={{ color: '#388e3c' }}>FREE</span> : `₹${deliveryCharges}`}</span>
                            </div>

                            <div className="price-item total">
                                <span>Total Payable</span>
                                <span>₹{finalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
