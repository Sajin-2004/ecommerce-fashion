import React from 'react';
import './AdvertisementBanner.css';

const AdvertisementBanner = () => {
    return (
        <div className="ad-banner-yellow">
            <div className="ad-banner-content-centered">
                <h2>Mid Season Fashion Sale</h2>
                <p>Flat 40% Off on Selected Styles. Discover the latest trends in luxury fashion.</p>
                <a href="#" onClick={(e) => e.preventDefault()} className="ad-shop-btn-black">Shop Now</a>
            </div>
        </div>
    );
};

export default AdvertisementBanner;
