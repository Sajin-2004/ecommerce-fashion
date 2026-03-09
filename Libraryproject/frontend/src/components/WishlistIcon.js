import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const WishlistIcon = () => {
    const { getWishlistCount } = useContext(WishlistContext);
    const count = getWishlistCount();

    return (
        <div className="nav-icon-wrapper" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span className="nav-icon-main">❤️</span>
            {count > 0 && <span className="wishlist-count" style={{ fontSize: "14px", fontWeight: "bold" }}>({count})</span>}
        </div>
    );
};

export default WishlistIcon;

