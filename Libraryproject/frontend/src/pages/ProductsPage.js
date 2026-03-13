import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import AdBanner from "../components/AdBanner";
import CategoryBanner from "../components/CategoryBanner";
import "./Home.css"; // Reuse home grid styles

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const brand = queryParams.get("brand");
    const category = queryParams.get("category");
    const subcategory = queryParams.get("subcategory");

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
        const fetchAndFilterProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                let filtered = res.data;

                if (brand) {
                    filtered = filtered.filter(p => p.brand && p.brand.toLowerCase() === brand.toLowerCase());
                }
                if (category) {
                    filtered = filtered.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
                }
                if (subcategory) {
                    filtered = filtered.filter(p => p.subcategory && p.subcategory.toLowerCase() === subcategory.toLowerCase());
                }

                setProducts(filtered);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterProducts();
    }, [brand, category, subcategory]);

    const getHeading = () => {
        if (brand) return `${brand.charAt(0).toUpperCase() + brand.slice(1)} Products`;
        if (category) {
            const catLabel = category.charAt(0).toUpperCase() + category.slice(1);
            if (subcategory) {
                return `${catLabel} ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Collection`;
            }
            return `${catLabel} Collection`;
        }
        return "All Products";
    };

    const getCategoryBannerData = () => {
        if (!category) return null;

        const catLower = category.toLowerCase();
        const subLower = subcategory ? subcategory.toLowerCase() : "";

        if (catLower === "men") {
            if (subLower === "shirt") {
                return {
                    title: "MEN'S PREMIUM SHIRT COLLECTION",
                    subtitle: "Discover Modern Styles for Every Occasion",
                    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
                    bgColor: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)"
                };
            }
            if (subLower === "pant") {
                return {
                    title: "MEN'S STYLISH PANT COLLECTION",
                    subtitle: "Premium Fit and Comfort in Every Detail",
                    image: "https://images.unsplash.com/photo-1624371414361-e6e0ed2eded?auto=format&fit=crop&q=80&w=800",
                    bgColor: "linear-gradient(135deg, #111111 0%, #f97316 150%)"
                };
            }
        } else if (catLower === "kids") {
            if (subLower === "shirt") {
                return {
                    title: "KIDS' COOL SHIRT COLLECTION",
                    subtitle: "Trendy and Comfortable for Little Ones",
                    image: "https://images.unsplash.com/photo-1519457431-7551afb6a456?auto=format&fit=crop&q=80&w=800",
                    bgColor: "linear-gradient(135deg, #1e3a8a 0%, #06b6d4 100%)"
                };
            }
            if (subLower === "pant") {
                return {
                    title: "KIDS' PLAYFUL PANT COLLECTION",
                    subtitle: "Durability Meets Style for Every Adventure",
                    image: "https://images.unsplash.com/photo-1544126592-807daa2b567b?auto=format&fit=crop&q=80&w=800",
                    bgColor: "linear-gradient(135deg, #4c1d95 0%, #ec4899 100%)"
                };
            }
        }
        return null;
    };

    const bannerData = getCategoryBannerData();

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
                {bannerData && (
                    <CategoryBanner 
                        title={bannerData.title}
                        subtitle={bannerData.subtitle}
                        image={bannerData.image}
                        bgColor={bannerData.bgColor}
                    />
                )}
                <div className="section-header">
                    <h3 style={{ margin: 0 }}>{getHeading()}</h3>
                </div>

                {loading ? (
                    <div style={{ padding: '50px', textAlign: 'center' }}>
                        <p>Loading products...</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.length > 0 ? (
                            renderProductsWithAds()
                        ) : (
                            <div style={{ padding: '40px', textAlign: 'center', width: '100%', gridColumn: 'span 4' }}>
                                <p>No products found for this selection.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;