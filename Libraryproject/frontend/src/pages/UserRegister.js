import React, { useState } from "react";
import axios from "axios";

function UserRegister({ setPage }) {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            alert("Registration successful! Please login.");
            setPage("userLogin");
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <button type="submit" className="auth-btn">Register</button>
            </form>
            <p>Already have an account? <span onClick={() => setPage("userLogin")} className="link">Login</span></p>
        </div>
    );
}

export default UserRegister;
