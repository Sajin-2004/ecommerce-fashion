import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import "./WishlistButton.css";

const WishlistButton = ({ product }) => {
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const isWishlisted = isInWishlist(product._id || product.productId);

    return (
        <button
            className="wishlist-btn-card"
            onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
            }}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            {isWishlisted ? "❤️" : "♡"}
        </button>
    );
};

export default WishlistButton;
