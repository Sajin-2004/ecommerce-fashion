import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.brand} className="cart-item-image" />

            <div className="cart-item-details">
                <h4>{item.brand}</h4>
                <p className="cart-item-category">{item.type} {item.category}</p>
                <p className="cart-item-price">₹{item.price}</p>
            </div>

            <div className="cart-item-quantity">
                <button onClick={() => decreaseQuantity(item.productId)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.productId)}>+</button>
            </div>

            <div className="cart-item-total">
                <p>₹{item.price * item.quantity}</p>
            </div>

            <button className="remove-item-btn" onClick={() => removeFromCart(item.productId)}>
                Remove
            </button>
        </div>
    );
};

export default CartItem;
