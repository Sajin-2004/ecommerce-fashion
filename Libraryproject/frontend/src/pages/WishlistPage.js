import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import "./WishlistPage.css";

const WishlistPage = ({ setPage }) => {
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    return (
        <div className="wishlist-container" style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
            <div className="wishlist-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h1 style={{ fontWeight: "800", color: "#212121" }}>My Wishlist ({wishlist.length})</h1>
                <button
                    className="back-shopping-btn"
                    onClick={() => setPage("home")}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#2874f0",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer"
                    }}
                >
                    Continue Shopping
                </button>
            </div>

            {wishlist.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 20px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e0e0e0" }}>
                    <div style={{ fontSize: "80px", marginBottom: "20px" }}>❤️</div>
                    <h2 style={{ color: "#212121", marginBottom: "10px" }}>Your wishlist is empty</h2>
                    <p style={{ color: "#757575", marginBottom: "30px" }}>Keep track of items you love by clicking the heart icon!</p>
                    <button
                        className="go-home-btn"
                        onClick={() => setPage("home")}
                        style={{
                            padding: "12px 30px",
                            backgroundColor: "#2874f0",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        Explore Products
                    </button>
                </div>
            ) : (
                <div className="products-grid">
                    {wishlist.map((item) => (
                        <div key={item._id} className="product-card" style={{ position: "relative", padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid #e0e0e0", transition: "all 0.3s" }}>
                            <button
                                className="remove-wishlist-btn"
                                onClick={() => toggleWishlist(item)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: "#f5f5f5",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                    zIndex: 5,
                                    fontSize: "18px",
                                    color: "#757575",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                title="Remove from Wishlist"
                            >
                                ✕
                            </button>

                            <div style={{ height: "200px", overflow: "hidden", borderRadius: "8px", marginBottom: "15px" }}>
                                <img src={item.image} alt={item.brand} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            </div>

                            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "5px 0" }}>{item.brand}</h3>
                            <p style={{ fontSize: "13px", color: "#757575", marginBottom: "10px" }}>
                                {item.type} {item.category}
                            </p>
                            <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "15px" }}>₹{item.price}</h2>

                            <button
                                className="cart-btn"
                                onClick={() => addToCart(item)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#ff9f00",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;

