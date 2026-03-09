import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartBadge = () => {
    const { getCartCount } = useContext(CartContext);
    const count = getCartCount();

    if (count === 0) return null;

    return (
        <span style={{ fontSize: "14px", marginLeft: "4px", color: "#444" }}>({count})</span>
    );
};

export default CartBadge;
