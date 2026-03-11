import React from "react";
import "./Popup.css";

function Popup({ showPopup, setShowPopup }) {

    if (!showPopup) return null;

    return (

        <div className="popup-overlay">

            <div className="popup-box">

                <h2>🎉 Order Placed Successfully</h2>

                <p>Your order will be delivered soon.</p>

                <button onClick={() => setShowPopup(false)}>
                    OK
                </button>

            </div>

        </div>

    );

}

export default Popup;