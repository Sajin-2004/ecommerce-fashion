import React, { useState, useEffect } from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
    const banners = [
        {
            id: 1,
            image: 'https://i.pinimg.com/1200x/de/f6/7a/def67a51cdbb2723cd7b07e4dc30fc0e.jpg',
            title: 'MEGA FASHION SALE',
            subtitle: 'Min 50% Off on Top Brands',
            category: 'all'
        },
        {
            id: 2,
            image: 'https://www.shutterstock.com/image-vector/ad-banner-design-kids-clothes-260nw-2191568211.jpg',
            title: 'KIDS COLLECTION SPECIAL',
            subtitle: 'Newest Styles for your Little Ones',
            category: 'kids'
        },
        {
            id: 3,
            image: 'https://i.pinimg.com/1200x/95/f9/16/95f916f0e120311e8c76893a412e3077.jpg',
            title: 'MENS TRENDING STYLES',
            subtitle: 'Leisure & Formal Wear - Up to 40% Off',
            category: 'mens'
        },
        {
            id: 4,
            image: 'https://i.pinimg.com/736x/37/32/64/373264c8d04b347e9e3c8fb938377bf9.jpg',
            title: 'BRAND CLEARANCE DEALS',
            subtitle: 'Nike, Adidas, Puma & more',
            category: 'brands'
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <div className="hero-banner-container">
            <div className="banner-slider" style={{ transform: `translateX(-${current * 100}%)` }}>
                {banners.map((banner) => (
                    <div key={banner.id} className="banner-slide">
                        <img src={banner.image} alt={banner.title} />
                        <div className="banner-content">
                            <h2>{banner.title}</h2>
                            <p>{banner.subtitle}</p>
                            
                        </div>
                    </div>
                ))}
            </div>
            <div className="banner-dots">
                {banners.map((_, idx) => (
                    <span
                        key={idx}
                        className={`dot ${current === idx ? 'active' : ''}`}
                        onClick={() => setCurrent(idx)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default HeroBanner;
