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
            title: "PREMIUM MEN'S SHIRTS", 
            subtitle: "Smart Styles for Work & Events", 
            offerLine: "Flat 50% OFF",
            discount: "50%",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
            category: "mens",
            subcategory: "shirts"
        },
        { 
            title: "TRENDY MEN'S T-SHIRTS", 
            subtitle: "Essential Comfort for Everyday Wear", 
            offerLine: "Buy 2 Get 1 Free",
            discount: "B2G1",
            image: "https://i.pinimg.com/736x/7d/90/c1/7d90c17c01b14c1a9cae31aad749c9c8.jpg",
            category: "mens",
            subcategory: "tshirts"
        },
        { 
            title: "MEN'S STYLISH PANTS", 
            subtitle: "Perfect Fit for Every Occasion", 
            offerLine: "Up to 45% OFF",
            discount: "45%",
            image: "https://images-cdn.ubuy.co.in/6362461b5811a62db4505b67-zmydz-men-stretch-straight-fit-jeans-men.jpg",
            category: "mens",
            subcategory: "pants"
        },
        { 
            title: "CUTE KIDS SHIRTS", 
            subtitle: "Colorful Styles for Your Little Ones", 
            offerLine: "Mini Fashion – 40% OFF",
            discount: "40%",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxl5VxEJdFUUUtSGyv0RLg7bvAc5WH235-Q&s",
            category: "kids",
            subcategory: "shirts"
        },
        { 
            title: "FUN KIDS T-SHIRTS", 
            subtitle: "Play-Ready Comfort with Cool Prints", 
            offerLine: "Kids Choice – 30% OFF",
            discount: "30%",
            image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT0Pb1dMLQuAQ3DOhnmHsDqz21xfdYI-VLDPTW5p84n2XFh687tl2PLGAcaorGmj2Cggo5kXfGJot-oJ92O3b6tKRNRq4USJ8iTeDXWU3pe8gNMpCD9aPnP2HqzfU5T60210c1kEjLWOGo&usqp=CAc",
            category: "kids",
            subcategory: "tshirts"
        },
        { 
            title: "DURABLE KIDS PANTS", 
            subtitle: "Tough Enough for Any Adventure", 
            offerLine: "Save 35% Today",
            discount: "35%",
            image: "https://5.imimg.com/data5/SELLER/Default/2025/7/529128387/MO/LJ/IW/154937683/cargo-pant.jpg",
            category: "kids",
            subcategory: "pants"
        }
    ];

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const renderProductsWithAds = () => {
        const elements = [];
        const adInterval = 4; // After every 4 products (one row)
        const displayProducts = products.slice(0, 24); // Show more products to accommodate all 6 ads

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
                        category={adContent[adIndex].category}
                        subcategory={adContent[adIndex].subcategory}
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