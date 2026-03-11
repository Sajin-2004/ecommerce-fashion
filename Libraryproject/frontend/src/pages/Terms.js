import React from 'react';
import { Link } from 'react-router-dom';
import './InfoPage.css';

const Terms = () => {
    const sections = [
        {
            title: '1. Acceptance of Terms',
            content: 'By accessing and using the FashionHub platform, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the website.'
        },
        {
            title: '2. User Accounts',
            content: 'You are responsible for maintaining the confidentiality of your account credentials. FashionHub is not liable for unauthorized access resulting from failure to keep your login details secure.'
        },
        {
            title: '3. Product Information',
            content: 'We strive to display accurate product descriptions, prices, and images. However, we do not warrant that all product information is error-free. FashionHub reserves the right to correct errors and update product information at any time.'
        },
        {
            title: '4. Orders & Payments',
            content: 'All orders are subject to availability and acceptance. Prices are subject to change without prior notice. We accept payments via VISA, Mastercard, Net Banking, and Cash on Delivery (COD).'
        },
        {
            title: '5. Return & Refund Policy',
            content: 'Products may be returned within 7 days of delivery provided they are unused, unwashed, and in their original packaging with tags intact. Refunds are processed within 5–7 business days to the original payment method.'
        },
        {
            title: '6. Intellectual Property',
            content: 'All content on FashionHub — including logos, images, and text — is the property of FashionHub Pvt Ltd and is protected by applicable intellectual property laws. Reproduction without permission is strictly prohibited.'
        },
        {
            title: '7. Governing Law',
            content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.'
        },
    ];

    return (
        <div className="info-page-container">
            <div className="info-page-card">
                <div className="info-page-hero" style={{ background: 'linear-gradient(135deg, #bf360c 0%, #e64a19 100%)' }}>
                    <span className="info-page-icon">📋</span>
                    <h1>Terms &amp; Conditions</h1>
                    <p className="info-subtitle">Last Updated: March 1, 2026</p>
                </div>

                <div className="info-content">
                    <p>
                        Please read these Terms &amp; Conditions carefully before using the FashionHub website or placing an order.
                        These terms constitute a legally binding agreement between you and FashionHub Pvt Ltd.
                    </p>

                    {sections.map((section, i) => (
                        <div key={i} className="policy-section">
                            <h2>{section.title}</h2>
                            <p>{section.content}</p>
                        </div>
                    ))}

                    <div className="info-highlight-box">
                        <p>For questions about these terms, contact us at <a href="mailto:legal@fashionhub.com" className="info-email-link">legal@fashionhub.com</a></p>
                    </div>

                    <div className="info-back-row">
                        <Link to="/" className="info-back-btn">← Back to Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
