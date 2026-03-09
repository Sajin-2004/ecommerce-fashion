import React from "react";
import "./Popup.css";

function OrderSuccessModal({ showPopup, setShowPopup, setPage }) {
    if (!showPopup) return null;

    const goHome = () => {
        setShowPopup(false);
        setPage("home");
    };

    const viewOrders = () => {
        setShowPopup(false);
        setPage("myOrders");
    };

    return (
        <div className="popup-overlay">
            <div className="popup-box" style={{ padding: "40px", borderRadius: "15px" }}>

                <div style={{ fontSize: "50px", marginBottom: "15px" }}>✅</div>
                <h2>Order Placed Successfully!</h2>
                <p style={{ color: "#555", marginTop: "10px", marginBottom: "25px" }}>
                    Thank you for shopping with FashionHub. We will deliver your package soon.
                </p>

                <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                    <button
                        onClick={goHome}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#2874f0",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                        Go to Home
                    </button>
                    <button
                        onClick={viewOrders}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                        View Orders
                    </button>
                </div>

            </div>
        </div>
    );
}

export default OrderSuccessModal;
