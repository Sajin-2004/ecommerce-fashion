import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="modern-footer">
            <div className="footer-content">
                {/* COLUMN 1 */}
                <div className="footer-brand">
                    <h2 className="brand-logo">FASHION<span>HUB</span></h2>
                    <p className="brand-desc">
                        Experience luxury fashion with our curated collections for men and kids. 
                        Defining elegance and modern style since 2026.
                    </p>
                </div>

                {/* COLUMN 2 */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products?category=mens">Men</Link></li>
                        <li><Link to="/products?category=kids">Kids</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                    </ul>
                </div>

                {/* COLUMN 3 */}
                <div className="footer-links">
                    <h3>Customer Service</h3>
                    <ul>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/faq">FAQs</Link></li>
                        <li><Link to="/returns">Returns</Link></li>
                        <li><Link to="/shipping">Shipping</Link></li>
                    </ul>
                </div>

                {/* COLUMN 4 */}
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" className="social-icon"><FaFacebook /></a>
                        <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
                        <a href="https://twitter.com" className="social-icon"><FaXTwitter /></a>
                        <a href="https://youtube.com" className="social-icon"><FaYoutube /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-premium">
                <p>&copy; 2026 FashionHub. Crafted for Excellence.</p>
            </div>
        </footer>
    );
};

export default Footer;
