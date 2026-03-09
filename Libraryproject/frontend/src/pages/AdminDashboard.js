import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard({ setPage }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const res = await axios.get("http://localhost:5000/api/admin/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    setPage("adminLogin");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [setPage]);

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Command Center</h1>
                <div className="admin-quick-actions">
                    <button onClick={() => setPage("manageProducts")} className="admin-pill-btn">Add/Manage Products</button>
                    <button onClick={() => setPage("manageOrders")} className="admin-pill-btn">Process Orders</button>
                </div>
            </div>

            <div className="admin-stats-card">
                <h2>User Management</h2>
                <p>Monitor and manage registered platform users.</p>

                {loading ? (
                    <div className="loader">Analyzing users...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Full Name</th>
                                    <th>Email Address</th>
                                    <th>Role Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td><code>{user._id}</code></td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-badge ${user.role}`}>
                                                {user.role}
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

export default AdminDashboard;
