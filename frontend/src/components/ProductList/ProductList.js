import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://dkart-project.onrender.com/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="no-products-message">No products found. Please check back later.</div>;
  }

  return (
    <div className="product-list-section">
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;