import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function WishlistPage() {
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="wishlist-page-container">
            <div className="wishlist-wrapper">
                <header className="wishlist-header-section">
                    <h1 className="wishlist-title">My Wishlist</h1>
                    <p className="items-count-text">{wishlist.length} Items Saved</p>
                </header>

                {wishlist.length === 0 ? (
                    <div className="empty-wishlist-state">
                        <div className="empty-wishlist-icon">
                            <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p>Items added to your wishlist will appear here.</p>
                        <button onClick={() => navigate("/")} className="explore-btn">
                            Explore Products
                        </button>
                    </div>
                ) : (
                    <div className="wishlist-items-list">
                        {wishlist.map((item) => (
                            <div key={item.productId} className="wishlist-card">
                                {/* Left Section: Image (30%) */}
                                <div className="wishlist-card-image">
                                    <div className="image-zoom-wrapper">
                                        <img src={item.image} alt={item.name || item.brand} />
                                    </div>
                                </div>

                                {/* Middle Section: Info (45%) */}
                                <div className="wishlist-card-info">
                                    <p className="item-category">{item.category || item.subcategory}</p>
                                    <h3 className="item-name">{item.name || item.title}</h3>
                                    
                                    <div className="item-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`star ${i < 4 ? 'filled' : ''}`}>★</span>
                                        ))}
                                        <span className="rating-count">(4.2)</span>
                                    </div>

                                    <div className="item-price-section">
                                        <span className="offer-price">₹{item.price}</span>
                                        <span className="original-price">₹{Math.round(item.price / 0.7)}</span>
                                        <span className="discount-badge">30% OFF</span>
                                    </div>
                                </div>

                                {/* Right Section: Actions (25%) */}
                                <div className="wishlist-card-actions">
                                    <button
                                        className="move-to-cart-premium"
                                        onClick={() => addToCart({ ...item, _id: item.productId })}
                                    >
                                        Move to Cart
                                    </button>
                                    <button
                                        className="remove-wishlist-premium"
                                        onClick={() => toggleWishlist({ ...item, _id: item.productId })}
                                    >
                                        <span className="btn-icon">🗑</span> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishlistPage;
