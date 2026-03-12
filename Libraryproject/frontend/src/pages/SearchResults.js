import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Home.css"; // Reuse home grid styles

function SearchResults() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        const fetchAndFilterProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                const allProducts = res.data;

                if (query) {
                    const filtered = allProducts.filter((product) =>
                        (product.name && product.name.toLowerCase().includes(query.toLowerCase())) ||
                        (product.title && product.title.toLowerCase().includes(query.toLowerCase())) ||
                        (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
                    );
                    setProducts(filtered);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterProducts();
    }, [query]);

    return (
        <div className="home-container" style={{ paddingTop: '20px' }}>
            <div className="products-section">
                <div className="section-header">
                    <h3 style={{ margin: 0 }}>
                        {products.length > 0
                            ? `Search Results for "${query}"`
                            : `No results found for "${query}"`}
                    </h3>
                </div>

                {loading ? (
                    <div style={{ padding: '50px', textAlign: 'center' }}>
                        <p>Searching for products...</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        ) : (
                            <div style={{ padding: '40px', textAlign: 'center', width: '100%', gridColumn: 'span 4' }}>
                                <p>We couldn't find any matches for your search. Try different keywords.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
