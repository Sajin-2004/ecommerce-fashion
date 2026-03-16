import React from 'react';
import './AdBanner.css';

const AdBanner = ({ title, subtitle, offerLine, image, discount }) => {
    const fallbackImage = "https://m.media-amazon.com/images/I/61T4fvnm4uL._AC_UF1000,1000_QL80_.jpg";
    
    return (
        <div className="ad-banner-container">
            <div className="ad-banner">
                <div className="ad-text-section">
                    <h2 className="ad-title">{title}</h2>
                    <p className="ad-subtitle">{subtitle}</p>
                    <div className="ad-offer-badge">{offerLine}</div>
                </div>

                <div className="ad-image-section">
                    <div className="ad-image-container">
                        <img
                            src={image || fallbackImage}
                            alt="promo"
                            className="ad-product-img"
                        />
                    </div>
                </div>

                {discount && (
                    <div className="ad-discount-badge">
                        <span>{discount}</span>
                        <span>OFF</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdBanner;