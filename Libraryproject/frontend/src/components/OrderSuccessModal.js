import React from "react";
import "./Popup.css";
import { useNavigate } from "react-router-dom";

function OrderSuccessModal({ showPopup, setShowPopup }) {
    const navigate = useNavigate();

    if (!showPopup) return null;

    const orderId = Math.floor(10000000 + Math.random() * 90000000); // Mock Order ID

    const goHome = () => {
        setShowPopup(false);
        navigate("/");
    };

    const viewOrders = () => {
        setShowPopup(false);
        navigate("/orders");
    };

    return (
        <div className="popup-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div className="popup-box" style={{
                background: '#fff',
                padding: "40px",
                borderRadius: "8px",
                maxWidth: '450px',
                width: '90%',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                animation: 'slideUp 0.3s ease-out'
            }}>

                <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#e7f3ff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: "40px"
                }}>
                    ✅
                </div>

                <h2 style={{ color: '#2874f0', marginBottom: '10px' }}>Order placed successfully!</h2>
                <p style={{ color: "#666", marginBottom: "5px" }}>
                    Thank you for your purchase.
                </p>
                <p style={{ fontWeight: '600', color: '#212121', marginBottom: '25px' }}>
                    Order ID: FH-{orderId}
                </p>

                <div style={{ display: "flex", flexDirection: 'column', gap: "12px" }}>
                    <button
                        onClick={goHome}
                        style={{
                            padding: "12px",
                            backgroundColor: "#2874f0",
                            color: "white",
                            border: "none",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontWeight: '600',
                            fontSize: '16px'
                        }}>
                        CONTINUE SHOPPING
                    </button>
                    <button
                        onClick={viewOrders}
                        style={{
                            padding: "12px",
                            backgroundColor: "#fff",
                            color: "#2874f0",
                            border: "1px solid #2874f0",
                            borderRadius: "2px",
                            cursor: "pointer",
                            fontWeight: '600',
                            fontSize: '14px'
                        }}>
                        VIEW ORDERS
                    </button>
                </div>

            </div>
            <style>
                {`
                    @keyframes slideUp {
                        from { transform: translateY(50px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
}

export default OrderSuccessModal;
