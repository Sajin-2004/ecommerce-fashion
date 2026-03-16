import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

function WishlistPage() {
    const { wishlist } = useContext(WishlistContext);
    const navigate = useNavigate();

    return (
        <div className="wishlist-page-container">
            <div className="wishlist-wrapper">
                {wishlist.length === 0 ? (
                    <div className="empty-wishlist-state">
                        <div className="empty-wishlist-icon">
                            <FaHeart />
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p>Start exploring and save your favorite products.</p>
                        <button onClick={() => navigate("/products")} className="explore-btn">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map((item) => (
                            <ProductCard 
                                key={item._id || item.productId} 
                                product={item} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishlistPage;
