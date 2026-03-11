import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import WishlistButton from "./WishlistButton";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

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

  // Mock discount calculation
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 20; // Default mock discount

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        {!isAdmin && <div className="wishlist-btn-card"><WishlistButton product={product} /></div>}
        <img src={product.image} alt={product.name || product.title} className="product-image" />
      </div>

      <div className="product-info">
        <h3 className="product-brand">{product.brand || 'FashionHub'}</h3>
        <p className="product-name">{product.name || product.title}</p>

        <div className="product-rating">
          <span className="rating-badge">
            {product.rating || '4.2'} ★
          </span>
          <span style={{ fontSize: "12px", color: "#878787" }}>
            (2,341)
          </span>
        </div>

        <div className="price-container">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          {product.originalPrice ? (
            <span className="product-old-price">₹{product.originalPrice.toLocaleString()}</span>
          ) : (
            <span className="product-old-price">₹{(product.price * 1.3).toLocaleString()}</span>
          )}
          <span className="product-discount">{discount}% off</span>
        </div>
      </div>

      {!isAdmin && (
        <div className="product-buttons">
          <button className="cart-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
            Add To Cart
          </button>
          <button className="buy-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
