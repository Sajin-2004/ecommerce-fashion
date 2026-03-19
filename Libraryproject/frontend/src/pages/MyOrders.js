import React, { useState, useEffect } from "react";
import axios from "axios";

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_BASE_URL}/api/orders/myorders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="my-orders-container">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice || order.price}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
