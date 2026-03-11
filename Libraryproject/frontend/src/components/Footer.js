import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-top">
                <div className="footer-section">
                    <h3>About FashionHub</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/contact">Press</Link></li>
                        <li><Link to="/about">Corporate Information</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Customer Service</h3>
                    <ul>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/terms">Returns</Link></li>
                        <li><Link to="/terms">Order Tracking</Link></li>
                        <li><Link to="/terms">Shipping &amp; Delivery</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Help</h3>
                    <ul>
                        <li><Link to="/contact">FAQ</Link></li>
                        <li><Link to="/terms">Payments</Link></li>
                        <li><Link to="/privacy-policy">Security</Link></li>
                        <li><Link to="/terms">Terms of Use</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        <a href="https://www.facebook.com/reel/1267504901971018">Facebook</a>
                        <a href="https://www.instagram.com/sajin_0_8_/?hl=en">Instagram</a>
                        <a href="https://x.com/">Twitter</a>
                        <a href="https://www.youtube.com/">YouTube</a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Download App</h3>
                    <div className="app-links">
                        <div className="app-badge">Google Play</div>
                        <div className="app-badge">App Store</div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="payment-methods">
                    <span>Payment Methods:</span>
                    <span>💳 VISA</span>
                    <span>💳 Mastercard</span>
                    <span>🏦 NetBanking</span>
                    <span>💵 Cash on Delivery</span>
                </div>
                <div className="footer-copyright">
                    <p>&copy; 2026 FashionHub. All rights reserved.</p>
                </div>
                <div className="footer-legal">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms">Terms &amp; Conditions</Link>
                    <Link to="/about">About Us</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
