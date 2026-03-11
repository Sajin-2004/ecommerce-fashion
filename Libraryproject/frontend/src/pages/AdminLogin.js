import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", formData);
            localStorage.setItem("adminToken", res.data.token);
            localStorage.setItem("adminUser", JSON.stringify(res.data.user));
            navigate("/admin-dashboard");
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || "Admin Login failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="email" name="email" placeholder="Admin Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Admin Password" required onChange={handleChange} />
                <button type="submit" className="auth-btn" style={{ backgroundColor: "#d9534f" }}>Login as Admin</button>
            </form>
        </div>
    );
}

export default AdminLogin;
