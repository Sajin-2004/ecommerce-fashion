import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Home({ products, fetchProducts, setPage, setBuyProduct }) {

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (

        <div className="products-grid">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    product={product}
                    setPage={setPage}
                    setBuyProduct={setBuyProduct}
                />
            ))}
        </div>

    );

}

export default Home;