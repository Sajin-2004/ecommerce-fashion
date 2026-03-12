import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvertisementSection.css';

const AdvertisementSection = () => {
    const navigate = useNavigate();

    const categories = [
        {
            name: 'MEN',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
            path: '/products?category=mens'
        },
        {
            name: 'KIDS',
            image: 'https://cdn.fcglcdn.com/brainbees/images/products/438x531/21309548a.webp',
            path: '/products?category=kids'
        }
    ];

    return (
        <div className="ads-container">
            {/* CATEGORY SHOWCASE */}
            <div className="category-showcase">
                {categories.map((cat, i) => (
                    <div 
                        key={i} 
                        className="category-card"
                        onClick={() => navigate(cat.path)}
                    >
                        <div className="category-image-box">
                            <img src={cat.image} alt={cat.name} />
                            <div className="category-overlay">
                                <div className="category-info">
                                    <h3>{cat.name}</h3>
                                    <button className="explore-btn-premium">Explore Collection</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PROMOTIONAL BANNER */}
            <div className="promo-banner">
                <div className="promo-content">
                    <span className="promo-tag">Limited Edition</span>
                    <h2>Summer Collection 2026</h2>
                    <p>Up to 40% Off on Luxury Essentials</p>
                    <button 
                        className="promo-shop-btn"
                        onClick={() => navigate('/products')}
                    >
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementSection;
