import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import ProductCard from "../components/ProductCard";
import AdBanner from "../components/AdBanner";
import "./Home.css"; // Reuse home grid styles

function SearchResults() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

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
            image: "https://rukminim2.flixcart.com/image/480/480/kuvkcy80/hanger/e/f/v/1-multi-function-8-in-1-cloth-hanger-magic-scalable-360-rotating-original-imag7wgqphptebrg.jpeg?q=90"
        }
    ];

    useEffect(() => {
        const fetchAndFilterProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_BASE_URL}/api/products`);
                const allProducts = res.data;

                if (query) {
                    const filtered = allProducts.filter((product) =>
                        (product.name && product.name.toLowerCase().includes(query.toLowerCase())) ||
                        (product.title && product.title.toLowerCase().includes(query.toLowerCase())) ||
                        (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
                    );
                    setProducts(filtered);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterProducts();
    }, [query]);

    const renderProductsWithAds = () => {
        const elements = [];
        const adInterval = 4; // After every 4 products (one row)

        products.forEach((product, index) => {
            elements.push(<ProductCard key={`prod-${product._id || index}`} product={product} />);
            
            // If we've reached the interval, insert an ad banner
            if ((index + 1) % adInterval === 0 && (index + 1) !== products.length) {
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
        <div className="home-container" style={{ paddingTop: '20px' }}>
            <div className="products-section">
                <div className="section-header">
                    <h3 style={{ margin: 0 }}>
                        {products.length > 0
                            ? `Search Results for "${query}"`
                            : `No results found for "${query}"`}
                    </h3>
                </div>

                {loading ? (
                    <div style={{ padding: '50px', textAlign: 'center' }}>
                        <p>Searching for products...</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.length > 0 ? (
                            renderProductsWithAds()
                        ) : (
                            <div style={{ padding: '40px', textAlign: 'center', width: '100%', gridColumn: 'span 4' }}>
                                <p>We couldn't find any matches for your search. Try different keywords.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;