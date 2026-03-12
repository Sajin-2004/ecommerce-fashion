import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function ManageOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const res = await axios.get("http://localhost:5000/api/admin/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data);
            } catch (error) {
                console.error("Error fetching admin orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Platform Transactions</h1>
                <button onClick={() => navigate("/admin-dashboard")} className="admin-pill-btn">Back to Dashboard</button>
            </div>

            <div className="admin-stats-card">
                <h3>Global Order Dispatch ({orders.length})</h3>
                <p>Manage fulfillment and monitor customer purchase flows.</p>

                {loading ? (
                    <div className="loader">Processing ledger...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Customer Identity</th>
                                    <th>Grand Total</th>
                                    <th>Booking Date</th>
                                    <th style={{ textAlign: "right" }}>Current Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td><code>{order._id}</code></td>
                                        <td>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <span style={{ fontWeight: "500" }}>{order.userId?.name || "Guest"}</span>
                                                <span style={{ fontSize: "12px", color: "gray" }}>{order.userId?.email || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: "bold", color: "#2874f0" }}>₹{order.totalPrice || order.price}</td>
                                        <td>{new Date(order.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                        <td style={{ textAlign: "right" }}>
                                            <span className={`status-pill ${order.status?.toLowerCase() || 'pending'}`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageOrders;
