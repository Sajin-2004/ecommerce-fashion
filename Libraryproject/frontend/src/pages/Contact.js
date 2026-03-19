import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { API_BASE_URL } from '../config';
import './Contact.css';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                setShowSuccessPopup(true);
            } else {
                setError(data.message || 'Failed to send message');
            }
        } catch (err) {
            const errorMsg = 'Something went wrong. Please try again later.';
            setError(errorMsg);
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setShowSuccessPopup(false);
        setForm({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <h1>Contact Us</h1>
                <p>We would love to hear from you</p>
            </section>

            <div className="contact-container">
                {/* Information Section */}
                <div className="contact-info-section">
                    <div className="info-card">
                        <div className="info-icon"><FaEnvelope /></div>
                        <div className="info-details">
                            <h4>Email</h4>
                            <a href="mailto:fashionhub@gmail.com">fashionhub@gmail.com</a>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon"><FaPhone /></div>
                        <div className="info-details">
                            <h4>Phone</h4>
                            <p>+91 9876543210</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon"><FaMapMarkerAlt /></div>
                        <div className="info-details">
                            <h4>Location</h4>
                            <p>FashionHub Pvt Ltd, Chennai, Tamil Nadu, India</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon"><FaClock /></div>
                        <div className="info-details">
                            <h4>Support Hours</h4>
                            <p>Mon – Sat: 9:00 AM – 6:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="contact-form-section">
                    <h2>Send us a Message</h2>
                    {error && <div className="error-msg">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={form.name} 
                                onChange={handleChange} 
                                required 
                                placeholder="Your name" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={form.email} 
                                onChange={handleChange} 
                                required 
                                placeholder="you@email.com" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input 
                                type="text" 
                                name="subject" 
                                value={form.subject} 
                                onChange={handleChange} 
                                placeholder="What is this about?" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea 
                                name="message" 
                                value={form.message} 
                                onChange={handleChange} 
                                required 
                                rows="5" 
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message →'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="back-shopping">
                <Link to="/" className="back-link">← Back to Shopping</Link>
            </div>

            {/* Success Popup Modal */}
            {showSuccessPopup && (
                <div className="success-popup-overlay">
                    <div className="success-popup-box">
                        <div className="success-popup-icon">
                            <FaCheckCircle />
                        </div>
                        <h3>Message Sent Successfully</h3>
                        <p>Thank you for contacting us. We will get back to you soon.</p>
                        <button className="popup-ok-btn" onClick={closePopup}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
