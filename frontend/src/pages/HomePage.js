import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import ProductList from '../components/ProductList/ProductList';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (minPrice) params.append('minPrice', minPrice);
            if (maxPrice) params.append('maxPrice', maxPrice);

            const { data } = await axios.get(`http://localhost:5000/api/products?${params.toString()}`);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        } finally {
            setLoading(false);
        }
    };

    const timer = setTimeout(() => {
        fetchProducts();
    }, 500);

    return () => clearTimeout(timer);

  }, [searchTerm, minPrice, maxPrice]);

  return (
    <div>
      <Hero />
      <div className="container">
        <div className="filters-container">
            <input 
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
        </div>
        
        {loading ? <div>Loading...</div> : <ProductList products={products} />}
      </div>
    </div>
  );
};

export default HomePage;