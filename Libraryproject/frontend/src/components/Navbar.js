import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";
import CartBadge from "./CartBadge";
import WishlistIcon from "./WishlistIcon";

function Navbar({ setProducts, fetchProducts, setPage }) {
    const [searchQuery, setSearchQuery] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === "admin";

    // ✅ LIVE SEARCH FILTER
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                handleLiveSearch();
            } else {
                fetchProducts();
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleLiveSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/search/${searchQuery}`);
            setProducts(res.data);
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLiveSearch();
        }
    };

    const handleCategory = async (type, category) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/filter/${type}/${category}`);
            setProducts(res.data);
            setPage("home");
        } catch (err) {
            console.error(err);
        }
    };

    const goHome = () => {
        setSearchQuery("");
        fetchProducts();
        setPage("home");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setPage("home");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            {/* ROW 1: Logo & Slogan */}
            <div className="nav-top">
                <div className="nav-top-left" onClick={() => { fetchProducts(); setPage("home"); }} style={{ cursor: "pointer" }}>
                    <h1 className="logo">FashionHub</h1>
                    <span className="slogan">Shopping brings you happiness</span>
                </div>
            </div>

            {/* ROW 2: Menu, Search, Icons */}
            <div className="nav-bottom">
                <div className="nav-bottom-left">
                    <button className="nav-home-btn" onClick={goHome} title="Home Page">
                        🏠
                    </button>
                    {!isAdmin && (
                        <>
                            <div className="nav-dropdown">
                                <button className="nav-dropbtn">Mens ▼</button>
                                <div className="nav-dropdown-content">
                                    <p onClick={() => handleCategory("mens", "shirts")}>Shirts</p>
                                    <p onClick={() => handleCategory("mens", "pants")}>Pants</p>
                                    <p onClick={() => handleCategory("mens", "tshirts")}>Tshirts</p>
                                </div>
                            </div>
                            <div className="nav-dropdown">
                                <button className="nav-dropbtn">Kids ▼</button>
                                <div className="nav-dropdown-content">
                                    <p onClick={() => handleCategory("kids", "shirts")}>Shirts</p>
                                    <p onClick={() => handleCategory("kids", "pants")}>Pants</p>
                                    <p onClick={() => handleCategory("kids", "tshirts")}>Tshirts</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="nav-bottom-center">
                    <input
                        type="text"
                        placeholder="Search for brands, categories, or products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="nav-bottom-right">
                    <div className="user-icon-container" title="Profile">
                        <span className="nav-icon-main">👤</span>
                        <div className="user-dropdown">
                            {user ? (
                                <>
                                    <p style={{ fontWeight: "bold", borderBottom: "2px solid #eee" }}>Hi, {user.name}</p>
                                    {!isAdmin && <p onClick={() => setPage("orders")}>My Orders</p>}
                                    {isAdmin && (
                                        <>
                                            <p onClick={() => setPage("adminDashboard")}>Dashboard</p>
                                            <p onClick={() => setPage("manageProducts")}>Products</p>
                                            <p onClick={() => setPage("manageOrders")}>Orders</p>
                                        </>
                                    )}
                                    <p onClick={logout} style={{ color: "red" }}>Logout</p>
                                </>
                            ) : (
                                <>
                                    <p onClick={() => setPage("userLogin")}>Login</p>
                                    <p onClick={() => setPage("userRegister")}>Sign Up</p>
                                    <hr />
                                    <p onClick={() => setPage("adminLogin")} style={{ fontSize: "12px", color: "gray" }}>Admin Portal</p>
                                </>
                            )}
                        </div>
                    </div>

                    {!isAdmin && (
                        <>
                            <div className="nav-icon-container" onClick={() => setPage("cart")} title="Cart" style={{ position: 'relative', cursor: 'pointer', fontSize: '20px' }}>
                                <span>🛒</span>
                                <CartBadge />
                            </div>

                            <div className="nav-icon-container" onClick={() => setPage("wishlist")} title="Wishlist" style={{ position: 'relative', cursor: 'pointer', fontSize: '20px' }}>
                                <WishlistIcon />
                            </div>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;