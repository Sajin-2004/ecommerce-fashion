import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = () => {
    const navigate = useNavigate();
    const banners = [
        {
            id: 1,
            image: 'https://i.pinimg.com/1200x/95/f9/16/95f916f0e120311e8c76893a412e3077.jpg',
            category: 'all'
        },
        {
            id: 2,
            image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/b23f37117518103.60773790202d1.png',
            category: 'kids'
        },
        {
            id: 3,
            image: 'https://img.freepik.com/free-psd/banner-urban-fashion-template_23-2148652497.jpg',
            category: 'mens'
        },
        {
            id: 4,
            image: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/b23f37117518103.60773790202d1.png',
            category: 'kids'
        },
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <div className="hero-banner-container">
            <div className="banner-slider" style={{ transform: `translateX(-${current * 100}%)` }}>
                {banners.map((banner) => (
                    <div key={banner.id} className="banner-slide">
                        <div className="banner-overlay"></div>
                        <img src={banner.image} alt={banner.title} />
                        <div className="banner-content">
                            <h2 className="fade-in">{banner.title}</h2>
                            <p className="fade-in">{banner.subtitle}</p>
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
