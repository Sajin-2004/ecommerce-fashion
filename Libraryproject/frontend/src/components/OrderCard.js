import React from "react";

const OrderCard = ({ order }) => {
    return (
        <div style={{
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            transition: "transform 0.2s",
            marginBottom: "20px"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "12px",
                marginBottom: "15px"
            }}>
                <div>
                    <p style={{ margin: 0, fontWeight: "700", color: "#212121", fontSize: "14px" }}>
                        ORDER # {order._id.substring(0, 8).toUpperCase()}
                    </p>
                    <span style={{ color: "#757575", fontSize: "12px" }}>
                        Placed on: {new Date(order.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                </div>
                <div style={{
                    backgroundColor: order.status === "Delivered" ? "#e8f5e9" : "#fff3e0",
                    color: order.status === "Delivered" ? "#2e7d32" : "#ef6c00",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600"
                }}>
                    {order.status || "Pending"}
                </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
                {order.products.map((prod, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", margin: "8px 0", fontSize: "14px" }}>
                        <span style={{ color: "#424242" }}>{prod.brand || "Product"} <span style={{ color: "#757575" }}>x {prod.quantity}</span></span>
                        <span style={{ fontWeight: "600" }}>₹{prod.price * prod.quantity}</span>
                    </div>
                ))}
            </div>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #f0f0f0",
                paddingTop: "12px"
            }}>
                <div style={{ fontSize: "12px", color: "#757575" }}>
                    Payment: <span style={{ color: "#212121", fontWeight: "500" }}>{order.paymentMethod}</span>
                </div>
                <div style={{ fontSize: "18px", fontWeight: "800", color: "#212121" }}>
                    Total: ₹{order.totalPrice}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
