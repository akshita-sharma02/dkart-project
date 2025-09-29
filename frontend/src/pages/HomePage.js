import React from 'react';
import Hero from '../components/Hero/Hero';
import ProductList from '../components/ProductList/ProductList';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="container">
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;