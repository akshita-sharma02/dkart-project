// frontend/src/pages/CartPage.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header/Header';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const API_URL = 'https://dkart-project.onrender.com/api';

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user) return;
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
        if (quantity < 1) return;
        try {
            const { data } = await axios.put(`${API_URL}/cart/${productId}`, { quantity });
            setCartItems(data); // Update state with the entire updated cart from backend
        } catch (error) {
            console.error('Failed to update quantity', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const { data } = await axios.delete(`${API_URL}/cart/${productId}`);
            setCartItems(data); // Update state with the updated cart
        } catch (error) {
            console.error('Failed to remove item', error);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

    if (loading) return <div>Loading your cart...</div>;

    return (
        <>
            <Header />
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
                                            min="1"
                                        />
                                        <button onClick={() => handleRemoveItem(item.product._id)} className="btn-remove">
                                            Remove
                                        </button>
                                    </div>
                                </div>
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
        </>
    );
};

export default CartPage;