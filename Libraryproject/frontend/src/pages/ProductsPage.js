import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Home.css"; // Reuse home grid styles

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const brand = queryParams.get("brand");
    const category = queryParams.get("category");
    const subcategory = queryParams.get("subcategory");

    useEffect(() => {
        const fetchAndFilterProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                let filtered = res.data;

                if (brand) {
                    filtered = filtered.filter(p => p.brand && p.brand.toLowerCase() === brand.toLowerCase());
                }
                if (category) {
                    filtered = filtered.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
                }
                if (subcategory) {
                    filtered = filtered.filter(p => p.subcategory && p.subcategory.toLowerCase() === subcategory.toLowerCase());
                }

                setProducts(filtered);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterProducts();
    }, [brand, category, subcategory]);

    const getHeading = () => {
        if (brand) return `${brand.charAt(0).toUpperCase() + brand.slice(1)} Products`;
        if (category) {
            const catLabel = category.charAt(0).toUpperCase() + category.slice(1);
            if (subcategory) {
                return `${catLabel} ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} Collection`;
            }
            return `${catLabel} Collection`;
        }
        return "All Products";
    };

    return (
        <div className="home-container" style={{ paddingTop: '20px' }}>
            <div className="products-section">
                <div className="section-header">
                    <h3 style={{ margin: 0 }}>{getHeading()}</h3>
                </div>

                {loading ? (
                    <div style={{ padding: '50px', textAlign: 'center' }}>
                        <p>Loading products...</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        ) : (
                            <div style={{ padding: '40px', textAlign: 'center', width: '100%', gridColumn: 'span 4' }}>
                                <p>No products found for this selection.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;
