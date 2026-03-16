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

    const getDefaultAdContent = () => [
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

    const getDynamicAdContent = () => {
        if (!category) return getDefaultAdContent();

        const catLower = category.toLowerCase();
        const subLower = subcategory ? subcategory.toLowerCase() : "";

        if (catLower.includes("men")) {
            if (subLower.includes("t-shirt") || subLower.includes("tshirt")) {
                return [{
                    title: "STYLE UP WITH MEN'S T-SHIRTS",
                    subtitle: "Comfort Meets Modern Street Style",
                    offerLine: "Hot Picks – Flat 40% OFF",
                    discount: "40%",
                    image: "https://i.pinimg.com/736x/7d/90/c1/7d90c17c01b14c1a9cae31aad749c9c8.jpg"
                }];
            } else if (subLower.includes("shirt")) {
                return [{
                    title: "MEN'S PREMIUM SHIRT COLLECTION",
                    subtitle: "Smart Styles for Work, Parties & Everyday Wear",
                    offerLine: "Limited Fashion Offer – Up to 50% OFF",
                    discount: "50%",
                    image: "data:image/jpeg;base64,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"
                }];
            } else if (subLower.includes("pant")) {
                return [{
                    title: "MEN'S TRENDING PANTS",
                    subtitle: "Comfortable & Stylish Pants for Everyday Wear",
                    offerLine: "Special Style Deal – Save Up to 45%",
                    discount: "45%",
                    image: "https://images-cdn.ubuy.co.in/6362461b5811a62db4505b67-zmydz-men-stretch-straight-fit-jeans-men.jpg"
                }];
            }
        } else if (catLower.includes("kids")) {
            if (subLower.includes("t-shirt") || subLower.includes("tshirt")) {
                return [{
                    title: "FUN KIDS T-SHIRT COLLECTION",
                    subtitle: "Bright Colors & Cool Prints Kids Love",
                    offerLine: "Limited Kids Deal – 30% OFF",
                    discount: "30%",
                    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT0Pb1dMLQuAQ3DOhnmHsDqz21xfdYI-VLDPTW5p84n2XFh687tl2PLGAcaorGmj2Cggo5kXfGJot-oJ92O3b6tKRNRq4USJ8iTeDXWU3pe8gNMpCD9aPnP2HqzfU5T60210c1kEjLWOGo&usqp=CAc"
                }];
            } else if (subLower.includes("shirt")) {
                return [{
                    title: "KIDS SHIRT COLLECTION",
                    subtitle: "Cute & Comfortable Styles for Kids",
                    offerLine: "Kids Fashion Deal – Up to 40% OFF",
                    discount: "40%",
                    image: "data:image/jpeg;base64,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"
                }];
            } else if (subLower.includes("pant")) {
                return [{
                    title: "KIDS TRENDY PANTS",
                    subtitle: "Play-Ready Comfort with Stylish Looks",
                    offerLine: "Special Kids Offer – Save 35%",
                    discount: "35%",
                    image: "https://5.imimg.com/data5/SELLER/Default/2025/7/529128387/MO/LJ/IW/154937683/cargo-pant.jpg"
                }];
            }
        }

        return getDefaultAdContent(); // fallback
    };

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

        if (catLower.includes("men")) {
            if (subLower.includes("t-shirt") || subLower.includes("tshirt")) {
                return {
                    title: "MEN'S T-SHIRT COLLECTION",
                    subtitle: "Trendy T-Shirts for a Modern Casual Look",
                    offerText: "Limited Time Offer – Up to 40% OFF",
                    discount: "40% OFF",
                    image: "https://static.vecteezy.com/system/resources/thumbnails/028/252/048/small/men-s-t-shirt-realistic-mockup-in-different-colors-ai-generated-photo.jpg",
                    bgColor: "linear-gradient(135deg, #524f4fff 0%, #474646ff 100%)" // Dark grey to orange
                };
            } else if (subLower.includes("shirt")) {
                return {
                    title: "MEN'S SHIRT COLLECTION",
                    subtitle: "Premium Formal & Casual Shirts for Modern Style",
                    offerText: "Limited Time Offer – Up to 50% OFF",
                    discount: "50% OFF",
                    image: "https://png.pngtree.com/png-vector/20240822/ourmid/pngtree-stack-of-folded-striped-dress-shirts-isolated-on-black-background-png-image_13591037.png",
                    bgColor: "linear-gradient(135deg, #78789eff 0%, #9096a2ff 100%)" // Dark blue to gold
                };
            } else if (subLower.includes("pant")) {
                return {
                    title: "MEN'S PANT COLLECTION",
                    subtitle: "Comfortable & Stylish Pants for Everyday Wear",
                    offerText: "Limited Time Offer – Up to 45% OFF",
                    discount: "45% OFF",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9h_SRZEFL-NoM47xBAZTwpC_N0laZcNWGQ&s",
                    bgColor: "linear-gradient(135deg, #92a0c1ff 0%, #bdbdb7ff 100%)" // Black to yellow
                };
            }
        } else if (catLower.includes("kids")) {
            if (subLower.includes("t-shirt") || subLower.includes("tshirt")) {
                return {
                    title: "KIDS T-SHIRT COLLECTION",
                    subtitle: "Fun Printed T-Shirts Kids Love",
                    offerText: "Limited Time Offer – Up to 30% OFF",
                    discount: "30% OFF",
                    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
                    bgColor: "linear-gradient(135deg, #383c38ff 0%, #a6a8a4ff 100%)" // Green to yellow
                };
            } else if (subLower.includes("shirt")) {
                return {
                    title: "KIDS SHIRT COLLECTION",
                    subtitle: "Cute and Comfortable Shirts for Kids",
                    offerText: "Limited Time Offer – Up to 40% OFF",
                    discount: "40% OFF",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnxl5VxEJdFUUUtSGyv0RLg7bvAc5WH235-Q&s",
                    bgColor: "linear-gradient(135deg, #514c51ff 0%, #615780ff 100%)" // Purple to pink
                };
            } else if (subLower.includes("pant")) {
                return {
                    title: "KIDS PANT COLLECTION",
                    subtitle: "Durable and Play-Friendly Kids Pants",
                    offerText: "Limited Time Offer – Up to 35% OFF",
                    discount: "35% OFF",
                    image: "data:image/jpeg;base64,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",
                    bgColor: "linear-gradient(135deg, #80c9dbff 0%, #9ba2a2ff 100%)" // Blue to cyan
                };
            }
        }
        return null;
    };

    const bannerData = getCategoryBannerData();
    const dynamicAdContent = getDynamicAdContent();

    const renderProductsWithAds = () => {
        const elements = [];
        const adInterval = 4; // After every 4 products (one row)

        products.forEach((product, index) => {
            elements.push(<ProductCard key={`prod-${product._id || index}`} product={product} />);

            // If we've reached the interval, insert an ad banner
            if ((index + 1) % adInterval === 0 && (index + 1) !== products.length) {
                const adIndex = (Math.floor((index + 1) / adInterval) - 1) % dynamicAdContent.length;
                elements.push(
                    <AdBanner
                        key={`ad-${index}`}
                        title={dynamicAdContent[adIndex].title}
                        subtitle={dynamicAdContent[adIndex].subtitle}
                        offerLine={dynamicAdContent[adIndex].offerLine}
                        discount={dynamicAdContent[adIndex].discount}
                        image={dynamicAdContent[adIndex].image}
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
                        offerText={bannerData.offerText}
                        image={bannerData.image}
                        discount={bannerData.discount}
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