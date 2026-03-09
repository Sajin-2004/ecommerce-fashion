import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user && user._id) {
                    const res = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`);
                    setOrders(res.data);
                }
            } catch (err) {
                console.error("Fetch orders error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Loading your orders...</div>;

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
            <h2 style={{ marginBottom: "20px", fontWeight: "800", color: "#212121" }}>My Orders</h2>
            <p style={{ color: "#757575", marginBottom: "30px" }}>Track and manage your previous purchases.</p>

            {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    <div style={{ fontSize: "50px", marginBottom: "15px" }}>📦</div>
                    <h3 style={{ color: "#212121" }}>No orders yet!</h3>
                    <p style={{ color: "#757575" }}>When you buy something, your orders will appear here.</p>
                </div>
            ) : (
                <div>
                    {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;

