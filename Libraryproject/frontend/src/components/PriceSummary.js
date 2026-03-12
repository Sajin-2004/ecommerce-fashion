import React from 'react';
import { useNavigate } from 'react-router-dom';

const PriceSummary = ({ cart, totalAmount }) => {
    const navigate = useNavigate();

    // Calculate total items
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Mock discount and delivery charges for Flipkart style
    const totalMRP = Math.round(totalAmount / 0.7);
    const discount = totalMRP - totalAmount;
    const deliveryCharges = totalAmount > 500 ? 0 : 40;
    const finalAmount = totalAmount + deliveryCharges;

    return (
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
                    <span>Total Amount</span>
                    <span>₹{finalAmount.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                    <div className="savings-text">
                        You will save ₹{discount.toLocaleString()} on this order
                    </div>
                )}
            </div>

            <div className="place-order-footer">
                <button
                    className="place-order-btn"
                    onClick={() => navigate('/checkout')}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default PriceSummary;
