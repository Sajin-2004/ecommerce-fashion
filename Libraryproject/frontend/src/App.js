import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderSuccessModal from "./components/OrderSuccessModal";
import axios from "axios";
import "./App.css";

// New Pages
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";
import WishlistPage from "./pages/WishlistPage";

// Global Cart Context
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState("home");
    const [showPopup, setShowPopup] = useState(false);
    const [buyProduct, setBuyProduct] = useState(null);

    const fetchProducts = useCallback(async () => {
        // Send token if exists so user ID can attach on checkout optionally
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
            const res = await axios.get("http://localhost:5000/api/products", { headers });
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
                        setProducts={setProducts}
                        fetchProducts={fetchProducts}
                        setPage={setPage}
                    />

                    {page === "home" && (
                        <Home products={products} fetchProducts={fetchProducts} setPage={setPage} setBuyProduct={setBuyProduct} />
                    )}

                    {page === "cart" && (
                        <CartPage setPage={setPage} />
                    )}

                    {page === "wishlist" && (
                        <WishlistPage setPage={setPage} />
                    )}

                    <OrderSuccessModal showPopup={showPopup} setShowPopup={setShowPopup} setPage={setPage} />

                    {page === "checkout" && (
                        <CheckoutPage setPage={setPage} setShowPopup={setShowPopup} />
                    )}

                    {/* --- User Pages --- */}
                    {page === "userLogin" && <UserLogin setPage={setPage} />}
                    {page === "userRegister" && <UserRegister setPage={setPage} />}
                    {page === "orders" && <OrdersPage />}


                    {/* --- Admin Pages --- */}
                    {page === "adminLogin" && <AdminLogin setPage={setPage} />}
                    {page === "adminDashboard" && <AdminDashboard setPage={setPage} />}
                    {page === "manageProducts" && <ManageProducts setPage={setPage} />}
                    {page === "manageOrders" && <ManageOrders setPage={setPage} />}

                </div>
            </CartProvider>
        </WishlistProvider>
    );
}

export default App;