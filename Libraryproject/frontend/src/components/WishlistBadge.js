import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const WishlistBadge = () => {
    const { getWishlistCount } = useContext(WishlistContext);
    const count = getWishlistCount();

    if (count === 0) return null;

    return (
        <span style={{ fontSize: "14px", marginLeft: "4px", color: "#444" }}>({count})</span>
    );
};

export default WishlistBadge;
