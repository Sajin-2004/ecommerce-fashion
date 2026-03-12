import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import CartBadge from "./CartBadge";
import WishlistIcon from "./WishlistIcon";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FiUser, FiPackage, FiLogOut, FiHeart } from "react-icons/fi";

function Navbar({ allProducts, setProducts, fetchProducts }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [accountOpen, setAccountOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null); // Track for mobile submenu
    const dropdownRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user && user.role === "admin";

    // Close dropdowns when clicking outside (for mobile/click-based)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setAccountOpen(false);
                setCategoriesOpen(false);
                setActiveCategory(null);
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
        setCategoriesOpen(false);
        setActiveCategory(null);
        navigate(`/products?category=${type}&subcategory=${category}`);
    };

    const toggleCategories = () => {
        if (window.innerWidth <= 768) {
            setCategoriesOpen(!categoriesOpen);
            setActiveCategory(null);
        }
    };

    const toggleSubCategory = (category) => {
        if (window.innerWidth <= 768) {
            setActiveCategory(activeCategory === category ? null : category);
        }
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
        <nav className="navbar" ref={dropdownRef}>
            <div className="nav-container">
                {/* Logo */}
                <div className="nav-logo-container" onClick={goHome}>
                    <h1 className="premium-logo">FASHION<span>HUB</span></h1>
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
                        <div 
                            className={`nav-dropdown-wrapper ${categoriesOpen ? 'active' : ''}`}
                            onMouseEnter={() => window.innerWidth > 768 && setCategoriesOpen(true)}
                            onMouseLeave={() => window.innerWidth > 768 && setCategoriesOpen(false)}
                        >
                            <button 
                                className="nav-dropbtn-premium"
                                onClick={toggleCategories}
                            >
                                Categories <FaChevronDown className={`arrow-icon ${categoriesOpen ? 'rotate' : ''}`} />
                            </button>
                            <div className={`nav-dropdown-content-premium ${categoriesOpen ? 'show' : ''}`}>
                                <div className="multi-level-menu">
                                    {/* MEN */}
                                    <div 
                                        className={`menu-item-with-submenu ${activeCategory === 'men' ? 'expanded' : ''}`}
                                        onMouseEnter={() => window.innerWidth > 768 && setActiveCategory('men')}
                                        onMouseLeave={() => window.innerWidth > 768 && setActiveCategory(null)}
                                        onClick={() => toggleSubCategory('men')}
                                    >
                                        <div className="menu-label">
                                            MEN <span className="submenu-arrow">▶</span>
                                        </div>
                                        <div className="submenu-content">
                                            <p onClick={(e) => { e.stopPropagation(); handleCategory("mens", "shirts"); }}>Shirts</p>
                                            <p onClick={(e) => { e.stopPropagation(); handleCategory("mens", "tshirts"); }}>T-Shirts</p>
                                            <p onClick={(e) => { e.stopPropagation(); handleCategory("mens", "pants"); }}>Pants</p>
                                        </div>
                                    </div>

                                    {/* KIDS */}
                                    <div 
                                        className={`menu-item-with-submenu ${activeCategory === 'kids' ? 'expanded' : ''}`}
                                        onMouseEnter={() => window.innerWidth > 768 && setActiveCategory('kids')}
                                        onMouseLeave={() => window.innerWidth > 768 && setActiveCategory(null)}
                                        onClick={() => toggleSubCategory('kids')}
                                    >
                                        <div className="menu-label">
                                            KIDS <span className="submenu-arrow">▶</span>
                                        </div>
                                        <div className="submenu-content">
                                            <p onClick={(e) => { e.stopPropagation(); handleCategory("kids", "shirts"); }}>Kids Shirts</p>
                                            <p onClick={(e) => { e.stopPropagation(); handleCategory("kids", "tshirts"); }}>Kids T-Shirts</p>
                                            <p onClick={(e) => { e.stopPropagation(); handleCategory("kids", "pants"); }}>Kids Pants</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="nav-right">
                        {/* Account Dropdown */}
                        <div 
                            className={`nav-item account-dropdown-premium ${accountOpen ? 'active' : ''}`}
                            ref={dropdownRef}
                            onMouseEnter={() => window.innerWidth > 768 && setAccountOpen(true)}
                            onMouseLeave={() => window.innerWidth > 768 && setAccountOpen(false)}
                        >
                            <div
                                className="account-toggle-premium"
                                onClick={() => window.innerWidth <= 768 && setAccountOpen(!accountOpen)}
                            >
                                <span className="user-greeting">Hello, {user ? user.name : 'Sign in'}</span>
                                <span className="account-text">
                                    Account <FaChevronDown className={`arrow-icon ${accountOpen ? 'rotate' : ''}`} />
                                </span>
                            </div>

                            <div className={`user-dropdown-content-premium ${accountOpen ? 'show' : ''}`}>
                                {user ? (
                                    <>
                                        <div className="user-header">
                                            <p>Hi, {user.name}</p>
                                        </div>
                                        <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/profile")}>
                                            <FiUser className="dropdown-icon" /> My Profile
                                        </p>
                                        {!isAdmin && (
                                            <>
                                                <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/orders")}>
                                                    <FiPackage className="dropdown-icon" /> Orders
                                                </p>
                                                <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/wishlist")}>
                                                    <FiHeart className="dropdown-icon" /> Wishlist
                                                </p>
                                            </>
                                        )}
                                        {isAdmin && (
                                            <>
                                                <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/adminDashboard")}>Dashboard</p>
                                                <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/manage-products")}>Products</p>
                                                <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/manage-orders")}>Orders</p>
                                            </>
                                        )}
                                        <p onClick={logout} className="logout-btn-premium">
                                            <FiLogOut className="dropdown-icon" /> Logout
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/login")}>Login</p>
                                        <p className="dropdown-link-premium" onClick={() => handleDropdownLink("/signup")}>Sign Up</p>
                                        <div className="admin-portal-divider">
                                            <p className="admin-link-premium" onClick={() => handleDropdownLink("/adminLogin")}>Admin Portal</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {!isAdmin && (
                            <>
                                <Link to="/wishlist" className="nav-item-premium">
                                    <WishlistIcon />
                                </Link>

                                <Link to="/cart" className="nav-item-premium">
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
