import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './CartPage.css';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const fetchCartItems = async () => {
        try {
            const { data } = await axios.get('https://dkart-project.onrender.com/api/cart');
            setCartItems(data);
        } catch (error) {
            console.error("Failed to fetch cart items", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCartItems();
        }
    }, [user]);

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            const { data } = await axios.put(`https://dkart-project.onrender.com/api/cart/₹{productId}`, { quantity: newQuantity });
            setCartItems(data);
        } catch (error) {
            console.error("Failed to update quantity", error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const { data } = await axios.delete(`https://dkart-project.onrender.com/api/cart/₹{productId}`);
            setCartItems(data);
        } catch (error) {
            console.error("Failed to remove item", error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);
    };

    if (loading) return <div>Loading your cart...</div>;

    return (
        <>
            <div className="cart-container">
                <h1>Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is empty.</p>
                        <Link to="/" className="btn-shop">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items-list">
                            {cartItems.map(item => (
                                <div key={item.product._id} className="cart-item">
                                    <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{item.product.name}</h3>
                                        <p>₹{item.product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="cart-item-actions">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                            min="1"
                                            className="quantity-input"
                                        />
                                        <button onClick={() => handleRemove(item.product._id)} className="btn-remove">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{calculateSubtotal()}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{calculateSubtotal()}</span>
                            </div>
                            <Link to="/checkout" state={{ amount: calculateSubtotal() }}>
                                <button className="btn-checkout">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;