import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        const fetchProductAndSimilar = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
                const prod = res.data;
                setProduct(prod);

                const subCat = prod.subcategory || prod.type;
                const similarRes = await axios.get(`${API_BASE_URL}/api/products/filter/${subCat}/${prod.category}`);
                setSimilarProducts(similarRes.data.filter(p => p._id !== id).slice(0, 4));
            } catch (err) {
                console.error("Error fetching product details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProductAndSimilar();
        window.scrollTo(0, 0);
    }, [id]);

    const handleQuantityChange = (type) => {
        if (type === "inc") setQuantity(quantity + 1);
        else if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    };

    const handleBuyNow = () => {
        navigate("/checkout", { state: { buyProduct: product, quantity } });
    };

    if (loading) return <div className="loading-container">Loading Product...</div>;
    if (!product) return <div className="error-container">Product not found.</div>;

    // Price calculations
    const sellingPrice = product.price;
    const originalPrice = product.originalPrice && product.originalPrice > sellingPrice
        ? product.originalPrice
        : Math.round(sellingPrice / 0.7);
    const discountPercent = Math.round(((originalPrice - sellingPrice) / originalPrice) * 100);

    const subcatLabel = product.subcategory || product.type || "—";
    const catLabel = product.category || "—";

    return (
        <div className="product-details-container">
            <div className="product-details-main">
                {/* LEFT: Image */}
                <div className="product-details-left">
                    <div className="product-image-large-wrapper">
                        <img src={product.image} alt={product.name || product.title} className="product-image-large" />
                    </div>
                    {/* Action Buttons below image on sticky sidebar */}
                    <div className="details-actions">
                        <button className="add-to-cart-large" onClick={() => addToCart(product, quantity)}>
                            🛒 ADD TO CART
                        </button>
                        <button className="buy-now-large" onClick={handleBuyNow}>
                            ⚡ BUY NOW
                        </button>
                    </div>
                </div>

                {/* RIGHT: Info */}
                <div className="product-details-right">
                    {/* Breadcrumb */}
                    <div className="product-path">
                        Home / {catLabel} / {subcatLabel}
                    </div>

                    <h1 className="details-brand">{product.brand}</h1>
                    <h2 className="details-name">{product.name || product.title}</h2>

                    {/* Rating */}
                    <div className="details-rating">
                        <div className="rating-pill">
                            <span>{product.rating} ★</span>
                        </div>
                        <span className="rating-count">({product.rating * 47} Ratings)</span>
                    </div>

                    <hr className="section-divider" />

                    {/* Price Section — Flipkart Style */}
                    <div className="price-section">
                        <span className="current-price">₹{sellingPrice.toLocaleString()}</span>
                        <span className="original-price">₹{originalPrice.toLocaleString()}</span>
                        <span className="discount-percent">{discountPercent}% off</span>
                    </div>
                    <p className="tax-note">Inclusive of all taxes. Free delivery on orders above ₹500.</p>

                    {/* Highlights */}
                    <div className="product-highlights">
                        <h3>Highlights</h3>
                        <ul>
                            <li>100% Genuine {product.brand} product</li>
                            <li>Premium quality {catLabel} clothing</li>
                            <li>Modern {subcatLabel} style</li>
                            <li>Breathable and comfortable fabric</li>
                            <li>7 Days Easy Returns &amp; Exchange</li>
                        </ul>
                    </div>

                    {/* Description */}
                    <div className="details-description-section">
                        <h3>Product Description</h3>
                        <p className="details-description">
                            {product.description
                                || `${product.brand} brings you this premium ${subcatLabel} designed for modern style and all-day comfort. Made with high-quality fabric, this ${catLabel} piece is perfect for casual and everyday wear. Whether you're heading out or staying in, this one's a wardrobe essential.`}
                        </p>
                    </div>

                    {/* Product Details Table */}
                    <div className="product-details-table-section">
                        <h3>Product Details</h3>
                        <table className="product-details-table">
                            <tbody>
                                <tr><td>Brand</td><td>{product.brand}</td></tr>
                                <tr><td>Category</td><td style={{ textTransform: 'capitalize' }}>{catLabel}</td></tr>
                                <tr><td>Sub Category</td><td style={{ textTransform: 'capitalize' }}>{subcatLabel}</td></tr>
                                <tr><td>Fabric</td><td>Premium Cotton Blend</td></tr>
                                <tr><td>Fit</td><td>Regular Fit</td></tr>
                                <tr><td>Style</td><td>Casual Wear</td></tr>
                                <tr><td>Wash Care</td><td>Machine Wash</td></tr>
                                <tr><td>Country of Origin</td><td>India</td></tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Stock */}
                    <div className="details-stock">
                        Availability: <span className={product.stock > 0 ? "stock-in" : "stock-out"}>
                            {product.stock > 0 ? `In Stock (${product.stock} units)` : "Out of Stock"}
                        </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="quantity-selector">
                        <span>Quantity:</span>
                        <div className="qty-controls">
                            <button onClick={() => handleQuantityChange("dec")}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange("inc")}>+</button>
                        </div>
                    </div>

                    {/* Delivery Check */}
                    <div className="delivery-check">
                        <div className="check-title">📦 Delivery Options</div>
                        <div className="pincode-input-box">
                            <input type="text" placeholder="Enter Pincode" maxLength="6" />
                            <button>Check</button>
                        </div>
                        <p className="delivery-info">Enter pincode to check delivery date &amp; COD availability</p>
                    </div>

                    {/* Security Badges */}
                    <div className="security-badges">
                        <div className="badge"><span>🛡️</span> 100% Safe Payments</div>
                        <div className="badge"><span>🔄</span> Easy Returns</div>
                        <div className="badge"><span>✅</span> Genuine Product</div>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <div className="similar-products-section">
                    <h3>Similar Products</h3>
                    <div className="products-grid">
                        {similarProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
