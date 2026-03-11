import React from 'react';
import { Link } from 'react-router-dom';
import './InfoPage.css';

const PrivacyPolicy = () => {
    const sections = [
        {
            title: '1. Information We Collect',
            content: 'We collect information you provide when registering an account, placing an order, or contacting support. This includes your name, email address, phone number, delivery address, and payment details.'
        },
        {
            title: '2. How We Use Your Information',
            content: 'Your data is used exclusively to process orders, provide customer support, personalize your shopping experience, and send order updates. We do not sell or share your personal data with any third party.'
        },
        {
            title: '3. Data Security',
            content: 'FashionHub employs industry-standard SSL encryption for all data transmissions. Payment information is processed through trusted and PCI-DSS compliant payment gateways. We do not store your card details on our servers.'
        },
        {
            title: '4. Cookies',
            content: 'We use cookies to enhance your browsing experience, remember preferences, and analyze website traffic. You may disable cookies in your browser settings, though this may affect certain features.'
        },
        {
            title: '5. Third-Party Links',
            content: 'Our website may contain links to third-party websites. FashionHub is not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies separately.'
        },
        {
            title: '6. Changes to This Policy',
            content: 'FashionHub reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. Continued use of our platform constitutes acceptance of the revised policy.'
        },
    ];

    return (
        <div className="info-page-container">
            <div className="info-page-card">
                <div className="info-page-hero" style={{ background: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)' }}>
                    <span className="info-page-icon">🔒</span>
                    <h1>Privacy Policy</h1>
                    <p className="info-subtitle">Effective Date: March 1, 2026</p>
                </div>

                <div className="info-content">
                    <p>
                        At FashionHub, your privacy is our priority. This policy outlines how we collect,
                        use, and protect your personal information when you shop with us.
                    </p>

                    {sections.map((section, i) => (
                        <div key={i} className="policy-section">
                            <h2>{section.title}</h2>
                            <p>{section.content}</p>
                        </div>
                    ))}

                    <div className="info-highlight-box">
                        <p>For any privacy-related concerns, contact us at <a href="mailto:privacy@fashionhub.com" className="info-email-link">privacy@fashionhub.com</a></p>
                    </div>

                    <div className="info-back-row">
                        <Link to="/" className="info-back-btn">← Back to Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
