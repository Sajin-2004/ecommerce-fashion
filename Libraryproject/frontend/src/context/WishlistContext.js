import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Fetch wishlist on mount if user logged in
    useEffect(() => {
        const fetchWishlist = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user._id) {
                try {
                    const res = await axios.get(`http://localhost:5000/api/wishlist/${user._id}`);
                    setWishlist(res.data);
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                }
            }
        };
        fetchWishlist();
    }, []);

    const toggleWishlist = async (product) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please login to use wishlist");
            return;
        }

        const isInList = wishlist.find(item => item.productId === product._id || item.productId === product.productId);

        if (isInList) {
            // Remove
            try {
                await axios.post("http://localhost:5000/api/wishlist/remove", {
                    userId: user._id,
                    productId: product._id || product.productId
                });
                setWishlist(wishlist.filter(item => item.productId !== (product._id || product.productId)));
            } catch (error) {
                console.error("Error removing from wishlist:", error);
            }
        } else {
            // Add
            try {
                const payload = {
                    userId: user._id,
                    productId: product._id,
                    brand: product.brand,
                    category: product.category,
                    type: product.type,
                    price: product.price,
                    image: product.image,
                    rating: product.rating
                };
                const res = await axios.post("http://localhost:5000/api/wishlist/add", payload);
                setWishlist([...wishlist, res.data.item]);
            } catch (error) {
                console.error("Error adding to wishlist:", error);
            }
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.productId === productId);
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, getWishlistCount }}>
            {children}
        </WishlistContext.Provider>
    );
};
