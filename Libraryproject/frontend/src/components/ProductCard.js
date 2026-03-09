import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import WishlistButton from "./WishlistButton";
import "./ProductCard.css";

function ProductCard({ product, setBuyProduct, setPage }) {
  const { addToCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  const handleBuyNow = () => {
    setBuyProduct(product);
    setPage("checkout");
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "#ffa000" : "#e0e0e0" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      {!isAdmin && (
        <div className="wishlist-btn-card">
          <WishlistButton product={product} />
        </div>
      )}

      <div className="product-image-container">
        <img src={product.image} alt={product.brand} className="product-image" />
      </div>

      <div className="product-info">
        <h3 className="product-brand">{product.brand}</h3>
        <p className="product-category">
          {product.type} {product.category}
        </p>
        <div className="product-rating">
          {renderStars(product.rating)}
          <span style={{ marginLeft: "5px", fontSize: "12px", color: "#757575" }}>
            ({product.rating})
          </span>
        </div>
        <h2 className="product-price">₹{product.price}</h2>
      </div>

      {!isAdmin && (
        <div className="product-buttons">
          <button className="cart-btn" onClick={() => addToCart(product)}>
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
