import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function ManageProducts({ setPage }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({ title: "", type: "", category: "", brand: "", price: "", oldPrice: "", image: "", rating: "" });

    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
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
            await axios.post("http://localhost:5000/api/admin/products", newProduct, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Product added successfully!");
            fetchProducts();
            setNewProduct({ title: "", type: "", category: "", brand: "", price: "", oldPrice: "", image: "", rating: "" });
        } catch (err) {
            console.error("Error adding product", err);
            alert("Failed to add product");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
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
                <button onClick={() => setPage("adminDashboard")} className="admin-pill-btn">Back to Dashboard</button>
            </div>

            <div className="admin-stats-card" style={{ marginBottom: "40px" }}>
                <h3>Catalog Registry</h3>
                <p>Register new seasonal collections and product lines.</p>
                <form onSubmit={handleAddProduct} className="admin-form-grid">
                    <input type="text" placeholder="Product Title" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} required />
                    <input type="text" placeholder="Type (e.g., tshirt)" value={newProduct.type} onChange={e => setNewProduct({ ...newProduct, type: e.target.value })} />
                    <input type="text" placeholder="Category (e.g., mens)" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                    <input type="text" placeholder="Brand Name" value={newProduct.brand} onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })} />
                    <input type="number" placeholder="Current Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                    <input type="number" placeholder="Original Price" value={newProduct.oldPrice} onChange={e => setNewProduct({ ...newProduct, oldPrice: e.target.value })} />
                    <input type="text" placeholder="Image URL (CDN preferred)" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} required />
                    <input type="number" step="0.1" placeholder="Initial Rating (1-5)" value={newProduct.rating} onChange={e => setNewProduct({ ...newProduct, rating: e.target.value })} />
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
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th style={{ textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p._id}>
                                        <td><img src={p.image} alt={p.title} className="admin-table-img" /></td>
                                        <td style={{ fontWeight: "500" }}>{p.title}</td>
                                        <td>₹{p.price}</td>
                                        <td><span className="role-badge" style={{ background: "#eee" }}>{p.category}</span></td>
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
