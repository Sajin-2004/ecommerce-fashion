import React, { useState } from "react";
import axios from "axios";

function UserLogin({ setPage }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setPage("home");
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>User Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <button type="submit" className="auth-btn">Login</button>
            </form>
            <p>Don't have an account? <span onClick={() => setPage("userRegister")} className="link">Register</span></p>
        </div>
    );
}

export default UserLogin;
