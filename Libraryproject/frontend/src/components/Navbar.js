import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";
import CartBadge from "./CartBadge";
import WishlistIcon from "./WishlistIcon";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ allProducts, setProducts, fetchProducts }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [accountOpen, setAccountOpen] = useState(false);
    const dropdownRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === "admin";

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setAccountOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const query = value.toLowerCase();

        if (query.trim() === "") {
            setProducts(allProducts);
        } else {
            const filtered = allProducts.filter((product) =>
                (product.name && product.name.toLowerCase().includes(query)) ||
                (product.title && product.title.toLowerCase().includes(query)) ||
                (product.brand && product.brand.toLowerCase().includes(query))
            );
            setProducts(filtered);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    const handleCategory = (type, category) => {
        navigate(`/products?category=${type}&subcategory=${category}`);
    };

    const goHome = () => {
        setSearchQuery("");
        fetchProducts();
        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

    const handleDropdownLink = (path) => {
        setAccountOpen(false);
        navigate(path);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo */}
                <div className="nav-logo-container" onClick={goHome}>
                    <h1>FashionHub</h1>
                    <span>Best of Best</span>
                </div>

                {/* Search Bar */}
                <div className="nav-search-container">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        value={searchQuery}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Nav Actions */}
                <div className="nav-actions">
                    {/* Categories Dropdown */}
                    {!isAdmin && (
                        <div className="nav-dropdown">
                            <button className="nav-dropbtn">Categories ▼</button>
                            <div className="nav-dropdown-content">
                                <p style={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>MENS</p>
                                <p onClick={() => handleCategory("mens", "shirts")}>Shirts</p>
                                <p onClick={() => handleCategory("mens", "tshirts")}>T-Shirts</p>
                                <p onClick={() => handleCategory("mens", "pants")}>Pants</p>
                                <p style={{ fontWeight: 'bold', borderBottom: '1px solid #eee', marginTop: '10px' }}>KIDS</p>
                                <p onClick={() => handleCategory("kids", "shirts")}>Shirts</p>
                                <p onClick={() => handleCategory("kids", "tshirts")}>T-Shirts</p>
                                <p onClick={() => handleCategory("kids", "pants")}>Pants</p>
                            </div>
                        </div>
                    )}

                    <div className="nav-right">
                        {/* Account Dropdown — Click-based (fixes My Orders not opening) */}
                        <div className="nav-item account-dropdown-wrapper" ref={dropdownRef}>
                            <div
                                className="account-toggle"
                                onClick={() => setAccountOpen(!accountOpen)}
                            >
                                <span className="nav-item-sub">Hello, {user ? user.name : 'Sign in'}</span>
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    Account {accountOpen ? '▲' : '▼'}
                                </span>
                            </div>

                            {accountOpen && (
                                <div className="user-dropdown-content user-dropdown-open">
                                    {user ? (
                                        <>
                                            <p style={{ fontWeight: "bold", background: '#f9f9f9' }}>
                                                Hi, {user.name}
                                            </p>
                                            {!isAdmin && (
                                                <p
                                                    className="dropdown-link"
                                                    onClick={() => handleDropdownLink("/orders")}
                                                >
                                                    📦 My Orders
                                                </p>
                                            )}
                                            {isAdmin && (
                                                <>
                                                    <p className="dropdown-link" onClick={() => handleDropdownLink("/adminDashboard")}>
                                                        Dashboard
                                                    </p>
                                                    <p className="dropdown-link" onClick={() => handleDropdownLink("/manage-products")}>
                                                        Products
                                                    </p>
                                                    <p className="dropdown-link" onClick={() => handleDropdownLink("/manage-orders")}>
                                                        Orders
                                                    </p>
                                                </>
                                            )}
                                            <p onClick={logout} className="logout-btn">🚪 Logout</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="dropdown-link" onClick={() => handleDropdownLink("/login")}>Login</p>
                                            <p className="dropdown-link" onClick={() => handleDropdownLink("/signup")}>Sign Up</p>
                                            <hr style={{ margin: '4px 0' }} />
                                            <p
                                                className="dropdown-link"
                                                style={{ fontSize: "12px", color: "gray" }}
                                                onClick={() => handleDropdownLink("/adminLogin")}
                                            >
                                                Admin Portal
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {!isAdmin && (
                            <>
                                {/* Wishlist */}
                                <Link to="/wishlist" className="nav-item">
                                    <WishlistIcon />
                                </Link>

                                {/* Cart */}
                                <Link to="/cart" className="nav-item">
                                    <div className="icon-wrapper">
                                        <span className="nav-icon">🛒</span>
                                        <CartBadge />
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
