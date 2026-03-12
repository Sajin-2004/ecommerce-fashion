import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import WishlistButton from "./WishlistButton";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate("/checkout", { state: { buyProduct: product } });
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 20;

  return (
    <div className="product-card-premium" onClick={handleCardClick}>
      <div className="product-card-inner">
        {/* LEFT SIDE - IMAGE */}
        <div className="product-image-side">
          {!isAdmin && <div className="wishlist-btn-overlay"><WishlistButton product={product} /></div>}
          <img src={product.image} alt={product.name || product.title} className="premium-image" />
          {discount > 0 && <div className="discount-badge-premium">{discount}% OFF</div>}
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="product-details-side">
          <div className="details-header">
            <h4 className="premium-brand">{product.brand || 'LUXURY COLLECTION'}</h4>
            <h3 className="premium-name">{product.name || product.title}</h3>
          </div>

          <div className="premium-rating">
            <div className="stars-box">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < 4 ? "star-active" : "star-inactive"} />
              ))}
            </div>
            <span className="rating-count">(1,240 Reviews)</span>
          </div>

          <div className="premium-price-box">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            <span className="old-price">₹{(product.originalPrice || product.price * 1.3).toLocaleString()}</span>
          </div>

          {!isAdmin && (
            <div className="premium-actions">
              <button 
                className="glass-cart-btn" 
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              >
                <FaShoppingCart /> Add
              </button>
              <button className="gradient-buy-btn" onClick={handleBuyNow}>
                <FaBolt /> Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
