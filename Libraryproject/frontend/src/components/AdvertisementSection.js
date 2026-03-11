import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvertisementSection.css';

const AdvertisementSection = () => {
    const navigate = useNavigate();

    const brands = [
        { name: 'Nike', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm5ESZL_Idpok09kEJoLhGtMm5hzj1Si___Q&s', label: 'Up to 30% Off' },
        { name: 'Adidas', img: 'https://frankshop.co.in/cdn/shop/files/download_8_4c72b958-fe6e-44b8-8103-296d9ed04b08.png?v=1717857081', label: 'Mega Sale' },
        { name: 'Puma', img: 'https://frenchcrown.in/cdn/shop/files/14018-CA-BLE_2_55630337-5758-4f2e-9132-dca9b1c83c61.jpg?v=1761640111&width=3500', label: 'Flat 20% Off' },
        { name: 'Levis', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', label: 'Buy 1 Get 1' }
    ];

    const kidsDeals = [
        { name: 'Kids Shirts', category: 'kids', subcategory: 'shirts', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU8XRHwOd3BLE-asGvZhTdM1fGl7SLOoVcaQ&s', label: 'Starts ₹299' },
        { name: 'Kids T-Shirts', category: 'kids', subcategory: 'tshirts', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRstY4TYHH7m9tt3ukRnrF_-L7fsPS9q8c4kA&s', label: 'Min 40% Off' },
        { name: 'Kids Pants', category: 'kids', subcategory: 'pants', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSalZmno59R_QPbr6ZAWdQrM1pmaJcVl2mwg&s', label: 'New Arrivals' },
        { name: 'Party Wear', category: 'kids', subcategory: 'shirts', img: 'https://cdn.fcglcdn.com/brainbees/images/products/438x531/21309548a.webp', label: 'Min 50% Off' }
    ];

    const trending = [
        { name: 'Trending Shirts', category: 'mens', subcategory: 'shirts', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', label: 'Best Sellers' },
        { name: 'Street T-Shirts', category: 'mens', subcategory: 'tshirts', img: 'https://airtex.in/cdn/shop/files/Men-premium-T-Shirt-Navy-Blue-and-Moss-Green-Airtex-64898022-_1.jpg?v=1750049507', label: 'Summer Deals' },
        { name: 'Denim Collection', category: 'mens', subcategory: 'pants', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', label: 'Classic Fits' },
        { name: 'Sports Wear', category: 'mens', subcategory: 'pants', img: 'https://bratmacrafts.com/cdn/shop/files/2_caec75e0-66e2-4a50-9263-f4d57bb93336.jpg?v=1727522686', label: 'Active Wear' }
    ];

    const handleBrandClick = (brandName) => {
        navigate(`/products?brand=${brandName.toLowerCase()}`);
    };

    const handleCategoryClick = (category, subcategory) => {
        navigate(`/products?category=${category}&subcategory=${subcategory}`);
    };

    return (
        <div className="ads-container">
            {/* Section 1: Top Brands */}
            <div className="ad-section">
                <div className="section-header">
                    <h3>Top Fashion Brands</h3>
                    <button className="view-all-btn" onClick={() => navigate('/products')}>VIEW ALL</button>
                </div>
                <div className="ad-grid">
                    {brands.map((brand, i) => (
                        <div key={i} className="ad-card" onClick={() => handleBrandClick(brand.name)}>
                            <div className="ad-img-box">
                                <img src={brand.img} alt={brand.name} />
                            </div>
                            <div className="ad-info">
                                <p className="ad-title">{brand.name}</p>
                                <p className="ad-label">{brand.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Special Section: Deals Banner */}
            <div className="deal-banner">
                <div className="deal-content">
                    <h2>Deal of the Day</h2>
                    <p>Flat 40% OFF on Men's Premium Shirts</p>
                    <button className="shop-now-btn" onClick={() => navigate('/products?category=mens&subcategory=shirts')}>SHOP NOW</button>
                </div>
                <div style={{ fontSize: '100px', opacity: 0.8 }}>👕</div>
            </div>

            {/* Section 2: Kids Fashion */}
            <div className="ad-section">
                <div className="section-header">
                    <h3>Kids Fashion Deals upto 30% Offer</h3>
                    <button className="view-all-btn" onClick={() => navigate('/products?category=kids')}>VIEW ALL</button>
                </div>
                <div className="ad-grid">
                    {kidsDeals.map((deal, i) => (
                        <div key={i} className="ad-card" onClick={() => handleCategoryClick(deal.category, deal.subcategory)}>
                            <div className="ad-img-box">
                                <img src={deal.img} alt={deal.name} />
                            </div>
                            <div className="ad-info">
                                <p className="ad-title">{deal.name}</p>
                                <p className="ad-label">{deal.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 3: Trending */}
            <div className="ad-section trending">
                <div className="section-header">
                    <h3>Trending Collections</h3>
                    <button className="view-all-btn" onClick={() => navigate('/products?category=mens')}>VIEW ALL</button>
                </div>
                <div className="ad-grid">
                    {trending.map((trend, i) => (
                        <div key={i} className="ad-card" onClick={() => handleCategoryClick(trend.category, trend.subcategory)}>
                            <div className="ad-img-box">
                                <img src={trend.img} alt={trend.name} />
                            </div>
                            <div className="ad-info">
                                <p className="ad-title">{trend.name}</p>
                                <p className="ad-label">{trend.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvertisementSection;
