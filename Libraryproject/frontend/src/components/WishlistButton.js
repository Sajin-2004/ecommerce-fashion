import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./WishlistButton.css";

const WishlistButton = ({ product }) => {
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    
    // Check if product exists in wishlist
    const isWishlisted = wishlist.some(item => (item.productId === product._id || item.productId === product.productId));

    const handleToggle = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div 
            className={`wishlist-icon ${isWishlisted ? "active" : ""}`} 
            onClick={handleToggle}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart color="black" />}
        </div>
    );
};

export default WishlistButton;
