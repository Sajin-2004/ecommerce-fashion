import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function WishlistPage() {
    const { wishlist, toggleWishlist } = useContext(WishlistContext);

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="wishlist-page" style={{ padding: '40px' }}>
            <h2 style={{ marginBottom: '30px', fontWeight: '800' }}>My Wishlist ({wishlist.length})</h2>

            {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '100px', backgroundColor: '#fff', padding: '50px', borderRadius: '15px' }}>
                    <div style={{ fontSize: '50px', marginBottom: '15px' }}>❤️</div>
                    <h3>Your Wishlist is Empty</h3>
                    <p style={{ color: '#666', marginBottom: '25px' }}>Add items you love to save them for later!</p>
                    <button onClick={() => navigate("/")} className="order-btn" style={{ padding: '12px 30px' }}>
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="products-grid">
                    {wishlist.map((item) => (
                        <div key={item.productId} className="product-card">
                            <div className="product-image-container">
                                <img src={item.image} alt={item.name || item.brand} className="product-image" />
                            </div>
                            <div className="product-info">
                                <h3 className="product-brand">{item.brand}</h3>
                                <p className="product-category">{item.subcategory || item.type} {item.category}</p>
                                <h2 className="product-name" style={{ fontSize: '14px', marginBottom: '10px' }}>{item.name || item.title}</h2>
                                <h2 className="product-price">₹{item.price}</h2>
                            </div>
                            <div className="product-buttons" style={{ flexDirection: 'column', gap: '8px' }}>
                                <button
                                    className="cart-btn"
                                    onClick={() => addToCart({ ...item, _id: item.productId })}
                                    style={{ width: '100%' }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="wishlist-remove-btn"
                                    onClick={() => toggleWishlist({ ...item, _id: item.productId })}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        color: '#ff3f6c',
                                        border: '1px solid #ff3f6c',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => { e.target.style.backgroundColor = '#fff1f4' }}
                                    onMouseOut={(e) => { e.target.style.backgroundColor = '#fff' }}
                                >
                                    Remove from Wishlist
                                </button>

                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;
