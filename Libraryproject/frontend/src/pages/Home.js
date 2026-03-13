import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/HeroBanner";
import AdvertisementSection from "../components/AdvertisementSection";
import AdBanner from "../components/AdBanner";
import ProductImageSlider from "../components/ProductImageSlider";
import "./Home.css";

function Home({ products, fetchProducts }) {

    const adContent = [
        { 
            title: "EXCLUSIVE DEALS ON PREMIUM FASHION", 
            subtitle: "Upgrade Your Style with Trending Products", 
            offerLine: "Limited Time Offer – Up to 50% OFF",
            discount: "50%",
            image: "https://m.media-amazon.com/images/I/61T4fvnm4uL._AC_UF1000,1000_QL80_.jpg"
        },
        { 
            title: "NEW SEASON COLLECTIONS", 
            subtitle: "Discover the Latest Men's & Kids' Trends", 
            offerLine: "Shop the Collection – Save Big Today",
            discount: "40%",
            image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRK0cJN_g7laIaEnTWinYjjb_pVvf3puW9asIXrhHu3bBefqPHHp6ZyDFHXFp5bYCQpmqBsKOvMgFpv-8Floe6Uh5q1ylKuUw"
        }
    ];

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const renderProductsWithAds = () => {
        const elements = [];
        const adInterval = 4; // After every 4 products (one row)
        const displayProducts = products.slice(0, 16); // Show up to 4 rows on home page

        displayProducts.forEach((product, index) => {
            elements.push(<ProductCard key={`prod-${product._id || index}`} product={product} />);
            
            // Insert ad after every 4 products
            if ((index + 1) % adInterval === 0 && (index + 1) !== displayProducts.length) {
                const adIndex = (Math.floor((index + 1) / adInterval) - 1) % adContent.length;
                elements.push(
                    <AdBanner 
                        key={`ad-${index}`} 
                        title={adContent[adIndex].title} 
                        subtitle={adContent[adIndex].subtitle} 
                        offerLine={adContent[adIndex].offerLine}
                        discount={adContent[adIndex].discount}
                        image={adContent[adIndex].image}
                    />
                );
            }
        });

        return elements;
    };

    return (
        <div className="home-container">
            {/* HEROBANNER SECTION */}
            <HeroBanner />

            {/* ADVERTISEMENT / DEAL SECTIONS */}
            <AdvertisementSection />

            {/* PRODUCT IMAGE SLIDER SECTION */}
            <ProductImageSlider products={products} />

            {/* PRODUCT GRID SECTION */}
            <div className="products-section">
                <div className="section-header">
                    <h3 style={{ margin: 0 }}>Suggested for You</h3>
                </div>
                <div className="products-grid">
                    {products.length > 0 ? (
                        renderProductsWithAds()
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