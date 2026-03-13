import React, { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import OrderSuccessModal from "./components/OrderSuccessModal";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderSuccess from "./pages/OrderSuccess";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import ProductsPage from "./pages/ProductsPage";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";


// Context
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [buyProduct, setBuyProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
            const res = await axios.get("http://localhost:5000/api/products", { headers });
            setAllProducts(res.data);
            setProducts(res.data);
        } catch (err) {
            console.error("API Error:", err);
        }
    }, []);

    return (
        <WishlistProvider>
            <CartProvider>
                <div>
                    <Navbar
                        allProducts={allProducts}
                        setProducts={setProducts}
                        fetchProducts={fetchProducts}
                    />
                    <ScrollToTop />

                    <Routes>
                        <Route path="/" element={<Home products={products} fetchProducts={fetchProducts} />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/checkout" element={<CheckoutPage setShowPopup={setShowPopup} />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/order-success" element={<OrderSuccess />} />

                        {/* Auth & Admin */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/adminLogin" element={<AdminLogin />} />
                        <Route path="/adminDashboard" element={<AdminDashboard />} />

                        <Route path="/user-login" element={<Login />} />
                        <Route path="/user-register" element={<Signup />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/manage-products" element={<ManageProducts />} />
                        <Route path="/manage-orders" element={<ManageOrders />} />

                        {/* Footer Pages */}
                        <Route path="/about" element={<About />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<Terms />} />

                    </Routes>

                    <OrderSuccessModal showPopup={showPopup} setShowPopup={setShowPopup} />
                    <Footer />
                </div>
            </CartProvider>
        </WishlistProvider>
    );
}

export default App;