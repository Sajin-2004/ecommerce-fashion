import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import ExcelUpload from "../components/ExcelUpload";

function ManageProducts() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({
        name: "",
        brand: "",
        category: "",
        subcategory: "",
        price: "",
        originalPrice: "",
        description: "",
        image: "",
        stock: 10,
        rating: 4
    });


    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/products`);
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/admin/products`, newProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Product added successfully!");
            fetchProducts();
            setNewProduct({
                name: "",
                brand: "",
                category: "",
                subcategory: "",
                price: "",
                originalPrice: "",
                description: "",
                image: "",
                stock: 10,
                rating: 4
            });
        } catch (err) {
            console.error("Error adding product", err);
            alert("Failed to add product");
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product", err);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Manage Product Inventory</h1>
                <button onClick={() => navigate("/admin-dashboard")} className="admin-pill-btn">Back to Dashboard</button>
            </div>

            <ExcelUpload onUploadSuccess={fetchProducts} />

            <div className="admin-stats-card" style={{ marginBottom: "40px" }}>

                <h3>Catalog Registry</h3>
                <p>Register new seasonal collections and product lines.</p>
                <form onSubmit={handleAddProduct} className="admin-form-grid">
                    <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
                    <input type="text" placeholder="Subcategory (e.g., shirts, pants)" value={newProduct.subcategory} onChange={e => setNewProduct({ ...newProduct, subcategory: e.target.value })} />
                    <input type="text" placeholder="Category (e.g., Mens, Kids)" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                    <input type="text" placeholder="Brand Name" value={newProduct.brand} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} />
                    <input type="number" placeholder="Current Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                    <input type="number" placeholder="Original Price" value={newProduct.originalPrice} onChange={e => setNewProduct({ ...newProduct, originalPrice: e.target.value })} />
                    <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} required />
                    <input type="number" step="0.1" placeholder="Initial Rating (1-5)" value={newProduct.rating} onChange={e => setNewProduct({ ...newProduct, rating: e.target.value })} />
                    <input type="number" placeholder="Initial Stock" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
                    <textarea placeholder="Product Description..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} style={{ gridColumn: "span 2", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}></textarea>
                    <button type="submit" className="admin-pill-btn" style={{ gridColumn: "span 2", margin: "10px 0" }}>Register Product</button>
                </form>

            </div>

            <div className="admin-stats-card">
                <h3>Live Inventory ({products.length})</h3>
                {loading ? <div className="loader">Syncing catalog...</div> : (
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th style={{ textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id}>
                                        <td><img src={p.image} alt={p.name || p.title} className="admin-table-img" /></td>
                                        <td style={{ fontWeight: "500" }}>{p.name || p.title}</td>
                                        <td>₹{p.price}</td>
                                        <td><span className="role-badge" style={{ background: "#eee" }}>{p.category}</span></td>
                                        <td><span className="role-badge" style={{ background: "#f9f9f9" }}>{p.subcategory || p.type}</span></td>

                                        <td style={{ textAlign: "right" }}>
                                            <button onClick={() => handleDelete(p._id)} className="admin-action-btn delete">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageProducts;
