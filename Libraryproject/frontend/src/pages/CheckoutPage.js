import React, { useState, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { CartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutPayment from "../components/CheckoutPayment";
import { FaLock, FaTruck, FaUndo, FaShieldAlt, FaTicketAlt } from "react-icons/fa";
import "./CheckoutPage.css";
import "./CartPage.css"; // Reuse summary styles

const CheckoutPage = ({ setShowPopup }) => {
    const { cart, getCartTotal, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
    const location = useLocation();
    const navigate = useNavigate();

    const buyProduct = location.state?.buyProduct;
    const [buyQuantity, setBuyQuantity] = useState(location.state?.quantity || 1);
    const [couponCode, setCouponCode] = useState("");

    const subtotal = buyProduct
        ? buyProduct.price * buyQuantity
        : getCartTotal();

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const isAddressValid = (addr) => {
        return (
            addr.name?.trim().length >= 3 &&
            /^\d{10}$/.test(addr.phone) &&
            addr.address?.trim().length >= 10 &&
            addr.city?.trim().length > 0 &&
            addr.state?.trim().length > 0 &&
            /^\d{6}$/.test(addr.pincode)
        );
    };

    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment, 3: Summary

    const itemsToDisplay = buyProduct
        ? [{ ...buyProduct, productId: buyProduct._id, quantity: buyQuantity }]
        : cart;

    const totalItems = itemsToDisplay.reduce((acc, item) => acc + item.quantity, 0);
    const totalMRP = Math.round(subtotal / 0.7);
    const discount = totalMRP - subtotal;
    const deliveryCharges = subtotal > 500 ? 0 : 40;
    const finalAmount = subtotal + deliveryCharges;

    const handleRazorpayPayment = async (orderPayload) => {
        try {
            // 1. Create Razorpay Order on Backend
            const { data: rzpOrder } = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
                amount: finalAmount
            });

            // 2. Open Razorpay Checkout
            const options = {
                key: "rzp_test_placeholder_key", // Should ideally come from backend or env
                amount: rzpOrder.amount,
                currency: rzpOrder.currency,
                name: "FashionHub",
                description: "Luxury Fashion Checkout",
                order_id: rzpOrder.id,
                handler: async (response) => {
                    try {
                        // 3. Verify Payment on Backend
                        const verifyPayload = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        };
                        const { data: verification } = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, verifyPayload);

                        if (verification.success) {
                            // 4. Create Final Order with Payment Details
                            const finalOrderPayload = {
                                ...orderPayload,
                                razorpayOrderId: response.razorpay_order_id,
                                paymentId: response.razorpay_payment_id,
                                paymentStatus: "Completed"
                            };
                            const res = await axios.post(`${API_BASE_URL}/api/orders/create`, finalOrderPayload);
                            
                            if (res.status === 201) {
                                if (!buyProduct) clearCart();
                                navigate("/order-success", { state: { order: res.data.order } });
                            }
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: address.name,
                    contact: address.phone
                },
                theme: {
                    color: "#FFC107"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error("Razorpay initiation error:", err);
            alert("Error initiating Razorpay. Please try again.");
        }
    };

    const handlePlaceOrder = async () => {
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

        if (selectedPayment === "razorpay") {
            await handleRazorpayPayment(orderPayload);
        } else {
            // COD Flow
            try {
                const res = await axios.post(`${API_BASE_URL}/api/orders/create`, orderPayload);
                if (res.status === 201) {
                    if (!buyProduct) clearCart();
                    navigate("/order-success", { state: { order: res.data.order } });
                }
            } catch (err) {
                console.error("Order error:", err);
                alert("Error placing order. Please try again.");
            }
        }
    };

    const handleRemoveItem = (productId) => {
        if (buyProduct) {
            navigate("/cart");
        } else {
            removeFromCart(productId);
            if (cart.length === 1) {
                navigate("/cart");
            }
        }
    };

    const handleIncrease = (productId) => {
        if (buyProduct) {
            setBuyQuantity(prev => prev + 1);
        } else {
            increaseQuantity(productId);
        }
    };

    const handleDecrease = (productId) => {
        if (buyProduct) {
            if (buyQuantity > 1) setBuyQuantity(prev => prev - 1);
        } else {
            decreaseQuantity(productId);
        }
    };

    if (!buyProduct && cart.length === 0) {
        navigate("/cart");
        return null;
    }

    return (
        <div className="checkout-page-container">
            <div className="checkout-layout">
                {/* Left: Steps Section */}
                <div className="checkout-steps-section">
                    
                    {/* Step 1: Delivery Address */}
                    <div className="checkout-step-card shadow-card">
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
                            <div className="step-content saved-info">
                                <div className="saved-address-details">
                                    <div className="user-name">{address.name} <span className="user-phone">{address.phone}</span></div>
                                    <div className="address-text">{address.address}, {address.city} - {address.pincode} ({address.state})</div>
                                </div>
                                <button onClick={() => setActiveStep(1)} className="change-btn">CHANGE</button>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Payment Options */}
                    <div className="checkout-step-card shadow-card">
                        <div className={`step-header ${activeStep !== 2 ? 'inactive' : ''}`}>
                            <span className="step-number">2</span>
                            PAYMENT OPTIONS
                        </div>
                        {activeStep === 2 && (
                            <div className="step-content">
                                <CheckoutPayment
                                    selectedMethod={selectedPayment}
                                    setSelectedMethod={setSelectedPayment}
                                />
                                <button className="continue-checkout-btn" onClick={() => setActiveStep(3)}>
                                    CONTINUE TO SUMMARY
                                </button>
                            </div>
                        )}
                        {activeStep > 2 && (
                            <div className="step-content saved-info">
                                <div className="payment-method-label">Payment Method: <strong>{selectedPayment.toUpperCase()}</strong></div>
                                <button onClick={() => setActiveStep(2)} className="change-btn">CHANGE</button>
                            </div>
                        )}
                    </div>

                    {/* Step 3: Order Summary (Items List) */}
                    <div className="checkout-step-card shadow-card">
                        <div className={`step-header ${activeStep !== 3 ? 'inactive' : ''}`}>
                            <span className="step-number">3</span>
                            ORDER SUMMARY
                        </div>
                        {activeStep === 3 && (
                            <div className="step-content">
                                <div className="items-summary-list">
                                    {itemsToDisplay.map((item) => (
                                        <div key={item.productId} className="checkout-summary-item-card">
                                            <div className="item-thumbnail">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="item-details-box">
                                                <div className="item-header-row">
                                                    <h4 className="item-brand-name">{item.brand}</h4>
                                                    <button className="remove-item-icon-btn" onClick={() => handleRemoveItem(item.productId)}>
                                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="item-full-name">{item.name}</p>
                                                <div className="item-pricing-row">
                                                    <span className="item-current-price">₹{item.price.toLocaleString()}</span>
                                                    <span className="item-old-price">₹{Math.round(item.price / 0.7).toLocaleString()}</span>
                                                </div>
                                                
                                                <div className="qty-management">
                                                    <button className="qty-btn" onClick={() => handleDecrease(item.productId)} disabled={item.quantity <= 1}>-</button>
                                                    <span className="qty-display-value">{item.quantity}</span>
                                                    <button className="qty-btn" onClick={() => handleIncrease(item.productId)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Mobile-only Total Summary before button */}
                                <div className="mobile-total-summary">
                                    <div className="total-label">Total Amount:</div>
                                    <div className="total-value">₹{finalAmount.toLocaleString()}</div>
                                </div>

                                <button 
                                    className="place-order-final-btn" 
                                    onClick={handlePlaceOrder}
                                    disabled={!isAddressValid(address)}
                                    style={{ opacity: !isAddressValid(address) ? 0.6 : 1, cursor: !isAddressValid(address) ? 'not-allowed' : 'pointer' }}
                                >
                                    PLACE ORDER
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Price Details (Desktop only or at bottom on mobile) */}
                <div className="cart-summary-section">
                    <div className="cart-card price-summary-card shadow-card">
                        <div className="summary-header">PRICE DETAILS</div>
                        <div className="summary-body">
                            <div className="price-item">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="price-item">
                                <span>Shipping</span>
                                <span>{deliveryCharges === 0 ? <span className="free-text">FREE</span> : `₹${deliveryCharges}`}</span>
                            </div>

                            <div className="price-item total-payable">
                                <span>Total Amount</span>
                                <span>₹{finalAmount.toLocaleString()}</span>
                            </div>
                            
                            <p className="savings-highlight">You are saving ₹{discount.toLocaleString()} with our best offers!</p>
                        </div>
                    </div>

                    {/* Promotional Banner */}
                    <div className="promo-banner-card shadow-card">
                        <div className="promo-tag">NEW OFFER</div>
                        <div className="promo-content">
                            <h3>Get 10% OFF on your first order</h3>
                            <p>Use code: <strong>WELCOME10</strong></p>
                        </div>
                    </div>

                    {/* Apply Coupon Section */}
                    <div className="coupon-section-card shadow-card">
                        <div className="section-title">
                            <FaTicketAlt className="title-icon" />
                            Apply Coupon
                        </div>
                        <div className="coupon-input-group">
                            <input 
                                type="text" 
                                placeholder="Enter coupon code" 
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button className="apply-coupon-btn">APPLY</button>
                        </div>
                        <p className="coupon-hint">Try <strong>FASHION10</strong> for 10% OFF</p>
                    </div>

                    {/* Secure Checkout Section */}
                    <div className="secure-checkout-card shadow-card">
                        <div className="trust-item">
                            <FaLock className="trust-icon" />
                            <div className="trust-text">
                                <strong>Secure Payment</strong>
                                <span>100% Protected Payment</span>
                            </div>
                        </div>
                        <div className="trust-item">
                            <FaUndo className="trust-icon" />
                            <div className="trust-text">
                                <strong>Easy 7 Day Returns</strong>
                                <span>Hassle-free return policy</span>
                            </div>
                        </div>
                        <div className="trust-item">
                            <FaTruck className="trust-icon" />
                            <div className="trust-text">
                                <strong>Fast Delivery</strong>
                                <span>Quick delivery to your doorstep</span>
                            </div>
                        </div>
                        <div className="trust-item">
                            <FaShieldAlt className="trust-icon" />
                            <div className="trust-text">
                                <strong>100% Genuine</strong>
                                <span>Authentic fashion products</span>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-trust-info">
                        <p>Safe and Secure Payments. 100% Authentic products.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
