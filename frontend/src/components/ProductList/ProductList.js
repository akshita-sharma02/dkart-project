import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = ({ products }) => { 
  
  if (!products || products.length === 0) {
    return <div className="no-products-message">No products found. Try adjusting your filters.</div>;
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