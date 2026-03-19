import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import PriceSummary from "../components/PriceSummary";
import "./CartPage.css";

const CartPage = () => {
    const { cart, getCartTotal } = useContext(CartContext);
    const subtotal = getCartTotal();

    if (cart.length === 0) {
        return (
            <div className="cart-page-container">
                <div className="cart-layout">
                    <div className="cart-items-section">
                        <div className="empty-cart-container">
                            <img
                                src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                                alt="Empty Cart"
                                className="empty-cart-img"
                            />
                            <div className="empty-cart-text">Your cart is empty!</div>
                            <span>Explore our categories and add some items.</span>
                            <br />
                            <Link to="/" className="shop-now-btn">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            <div className="cart-layout">
                {/* Left Section: Items */}
                <div className="cart-items-section cart-card">
                    <div className="cart-header">
                        My Cart ({cart.length})
                    </div>
                    {cart.map((item) => (
                        <CartItem key={item.productId} item={item} />
                    ))}
                </div>

                {/* Right Section: Price Summary */}
                <div className="cart-summary-section">
                    <PriceSummary cart={cart} totalAmount={subtotal} />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
