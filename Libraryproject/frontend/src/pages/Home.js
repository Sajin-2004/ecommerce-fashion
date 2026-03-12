import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import AdvertisementSection from "../components/AdvertisementSection";
import "./Home.css";

function Home({ products, fetchProducts }) {

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="home-container">
            {/* HEROBANNER SECTION */}
            <HeroBanner />

            {/* ADVERTISEMENT / DEAL SECTIONS */}
            <AdvertisementSection />

            {/* PRODUCT GRID SECTION */}
            <div className="products-section">
                <div className="section-header">
                    <h3 style={{ margin: 0 }}>Suggested for You</h3>
                </div>
                <div className="products-grid">
                    {products.length > 0 ? (
                        products.slice(0, 8).map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                            />
                        ))
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', width: '100%', gridColumn: 'span 4' }}>
                            <p>No products found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;