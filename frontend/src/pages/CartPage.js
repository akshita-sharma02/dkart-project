// frontend/src/pages/CartPage.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // Make sure this URL points to your deployed backend
    const API_URL = 'https://dkart-project.onrender.com/api';

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user) return; // Don't fetch if the user is not logged in
            try {
                const { data } = await axios.get(`${API_URL}/cart`);
                setCartItems(data);
            } catch (error) {
                console.error('Failed to fetch cart items', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, [user]);

    const handleQuantityChange = async (productId, quantity) => {
        // We allow quantity to be 0 or less, as the backend will handle removal
        try {
            const { data } = await axios.put(`${API_URL}/cart/${productId}`, { quantity });
            setCartItems(data);
        } catch (error) {
            console.error('Failed to update quantity', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const { data } = await axios.delete(`${API_URL}/cart/${productId}`);
            setCartItems(data);
        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => {
        // Ensure product and price exist before calculation
        if (item.product && item.product.price) {
            return acc + item.quantity * item.product.price;
        }
        return acc;
    }, 0);

    if (loading) {
        return <div className="cart-container">Loading your cart...</div>;
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    Your cart is empty. <Link to="/">Go Shopping</Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            // Check if item.product is not null before rendering
                            item.product && (
                                <div key={item.product._id} className="cart-item-card">
                                    <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{item.product.name}</h3>
                                        <p>₹{item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <input
                                            type="number"
                                            className="quantity-input"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                            min="0" // Set min to 0 to allow removal by setting quantity
                                        />
                                        <button onClick={() => handleRemoveItem(item.product._id)} className="btn-remove">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                    <div className="order-summary-card">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <button className="btn-checkout">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;