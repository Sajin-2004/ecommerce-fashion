import React from 'react';
import { Link } from 'react-router-dom';
import './InfoPage.css';

const About = () => {
    return (
        <div className="info-page-container">
            <div className="info-page-card">
                <div className="info-page-hero">
                    <span className="info-page-icon">👗</span>
                    <h1>About FashionHub</h1>
                    <p className="info-subtitle">Delivering Style, Comfort &amp; Confidence</p>
                </div>

                <div className="info-content">
                    <p>
                        FashionHub is a premier online fashion destination offering the latest trends in
                        <strong> Mens</strong> and <strong>Kids clothing</strong>. Our mission is to deliver
                        high-quality fashion products at affordable prices — right to your doorstep.
                    </p>

                    <h2>What We Offer</h2>
                    <ul className="info-list">
                        <li>👕 Mens Shirts &amp; T-Shirts</li>
                        <li>👖 Mens Pants &amp; Denim</li>
                        <li>👦 Kids Shirts &amp; T-Shirts</li>
                        <li>🎉 Kids Party Wear &amp; Casual Wear</li>
                    </ul>

                    <h2>Our Mission</h2>
                    <p>
                        At FashionHub, we believe great style shouldn't cost a fortune. We partner with
                        top brands like Nike, Adidas, Puma, and Levi's to bring you authentic products
                        with guaranteed quality. Our commitment is to provide a seamless, trustworthy,
                        and enjoyable shopping experience for every customer.
                    </p>

                    <h2>Why Choose Us?</h2>
                    <div className="info-cards-row">
                        <div className="info-mini-card">
                            <span>🛡️</span>
                            <h4>100% Genuine</h4>
                            <p>All products are sourced directly from authorized brand partners.</p>
                        </div>
                        <div className="info-mini-card">
                            <span>🚀</span>
                            <h4>Fast Delivery</h4>
                            <p>Pan-India delivery within 5–7 business days.</p>
                        </div>
                        <div className="info-mini-card">
                            <span>🔄</span>
                            <h4>Easy Returns</h4>
                            <p>7-day hassle-free return and exchange policy.</p>
                        </div>
                    </div>

                    <div className="info-back-row">
                        <Link to="/" className="info-back-btn">← Back to Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
