import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartBadge = () => {
    const { getCartCount } = useContext(CartContext);
    const count = getCartCount();

    if (count === 0) return null;

    return (
        <span className="badge">{count}</span>
    );
};

export default CartBadge;
