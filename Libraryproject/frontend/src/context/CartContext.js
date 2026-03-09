import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize from LocalStorage or empty
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sync to local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Method to add items (accumulates quantity natively)
    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.productId === (product.productId || product._id));
            if (exists) {
                // Increment quantity
                return prev.map((item) =>
                    item.productId === exists.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item
                return [
                    ...prev,
                    {
                        productId: product._id || product.productId,
                        brand: product.brand,
                        category: product.category,
                        type: product.type,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    }
                ];
            }
        });
    };

    // Method to remove items entirely
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
    };

    // Method to increment quantity
    const increaseQuantity = (productId) => {
        setCart((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Method to decrement quantity
    const decreaseQuantity = (productId) => {
        setCart((prev) =>
            prev.map((item) =>
                item.productId === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Empty cart function (used after successful checkouts)
    const clearCart = () => {
        setCart([]);
    };

    // Calculate cart total dynamically
    const getCartTotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    // Get total discrete items in cart dynamically
    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                getCartTotal,
                getCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
