import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage.css';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="info-page-container">
            <div className="info-page-card">
                <div className="info-page-hero" style={{ background: 'linear-gradient(135deg, #0d7377 0%, #14a085 100%)' }}>
                    <span className="info-page-icon">📞</span>
                    <h1>Contact Us</h1>
                    <p className="info-subtitle">We're here to help — reach out anytime!</p>
                </div>

                <div className="info-content contact-layout">
                    {/* Left: Info */}
                    <div className="contact-info-col">
                        <h2>Get in Touch</h2>
                        <div className="contact-detail">
                            <span>📧</span>
                            <div>
                                <strong>Email</strong>
                                <a href="mailto:support@fashionhub.com">support@fashionhub.com</a>
                            </div>
                        </div>
                        <div className="contact-detail">
                            <span>📱</span>
                            <div>
                                <strong>Phone</strong>
                                <span>+91 9876543210</span>
                            </div>
                        </div>
                        <div className="contact-detail">
                            <span>🏢</span>
                            <div>
                                <strong>Office</strong>
                                <span>FashionHub Pvt Ltd<br />Chennai, Tamil Nadu, India</span>
                            </div>
                        </div>
                        <div className="contact-detail">
                            <span>🕐</span>
                            <div>
                                <strong>Support Hours</strong>
                                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="contact-form-col">
                        <h2>Send us a Message</h2>
                        {submitted ? (
                            <div className="info-highlight-box" style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '40px' }}>✅</p>
                                <h3>Message Received!</h3>
                                <p>Thank you, {form.name}. We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="contact-form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                                </div>
                                <div className="contact-form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" />
                                </div>
                                <div className="contact-form-group">
                                    <label>Message</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} required rows="4" placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="contact-submit-btn">Send Message →</button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="info-content">
                    <div className="info-back-row">
                        <Link to="/" className="info-back-btn">← Back to Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
