import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const CartItem = ({ item }) => {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
    const { toggleWishlist } = useContext(WishlistContext);

    const originalPrice = Math.round(item.price / 0.7);
    const discount = Math.round(((originalPrice - item.price) / originalPrice) * 100);
    const itemTotal = item.price * item.quantity;

    return (
        <div className="cart-item-card">
            {/* Left: Image + Quantity */}
            <div className="cart-item-left">
                <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                />
                <div className="qty-control">
                    <button
                        className="qty-btn"
                        onClick={() => decreaseQuantity(item.productId)}
                        disabled={item.quantity <= 1}
                    >
                        −
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button
                        className="qty-btn"
                        onClick={() => increaseQuantity(item.productId)}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Center: Product Info */}
            <div className="cart-item-info">
                <div className="item-brand">{item.brand || 'FashionHub'}</div>
                <div className="item-name">{item.name}</div>

                <div className="item-price-row">
                    <span className="current-price">₹{item.price.toLocaleString()}</span>
                    <span className="original-price">₹{originalPrice.toLocaleString()}</span>
                    <span className="discount-tag">{discount}% off</span>
                </div>

                <div className="item-subtotal">
                    Total: <strong>₹{itemTotal.toLocaleString()}</strong>
                </div>

                <div className="item-actions">
                    <button
                        className="save-later-btn"
                        onClick={() => {
                            toggleWishlist(item);
                            removeFromCart(item.productId);
                        }}
                    >
                        🤍 SAVE FOR LATER
                    </button>
                    <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.productId)}
                    >
                        🗑 REMOVE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
