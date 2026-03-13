import React from 'react';
import './CategoryBanner.css';

const CategoryBanner = ({ title, subtitle, image, bgColor }) => {
    // Elegant fallback gradient if none provided
    const bannerStyle = {
        background: bgColor || 'linear-gradient(135deg, #1e3a8a 0%, #6d28d9 100%)'
    };

    return (
        <div className="category-banner-wrapper">
            <div className="category-promo-banner" style={bannerStyle}>
                <div className="cat-banner-content">
                    <h2 className="cat-banner-title">{title}</h2>
                    <p className="cat-banner-subtitle">{subtitle}</p>
                    <button className="cat-banner-btn">Explore Collection</button>
                </div>
                <div className="cat-banner-image-container">
                    <img src={image} alt={title} className="cat-banner-img" />
                    <div className="cat-banner-shadow"></div>
                </div>
            </div>
        </div>
    );
};

export default CategoryBanner;