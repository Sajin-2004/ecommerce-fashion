import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const WishlistIcon = () => {
    const { getWishlistCount } = useContext(WishlistContext);
    const count = getWishlistCount();

    return (
        <div className="icon-wrapper">
            <span className="nav-icon">❤️</span>
            {count > 0 && <span className="badge">{count}</span>}
        </div>
    );
};

export default WishlistIcon;
