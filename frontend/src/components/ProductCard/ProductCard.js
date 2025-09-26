// In frontend/src/components/ProductCard/ProductCard.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // This function is called when the "ADD TO CART" button is clicked
  const addToCartHandler = async () => {
    // If there is no logged-in user, show an alert and go to the login page
    if (!user) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      // Send a request to the backend to add this product to the user's cart
      await axios.post('http://localhost:5000/api/cart', 
        {
          productId: product._id,
          quantity: 1,
        },
        // The token is already set in the global axios headers by our AuthContext
      );
      alert(`${product.name} added to cart!`);
    } catch (error) {
      alert('Failed to add item to cart. Please try again.');
      console.error("Error adding to cart:", error);
    }
  };

  // A small helper function to display star ratings
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? 'star-filled' : 'star-empty'}>★</span>);
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <div className="product-rating">
        {renderStars(product.rating)}
      </div>
      <p className="product-price">₹{product.price}</p>
      <button onClick={addToCartHandler} className="btn-add-to-cart">
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;