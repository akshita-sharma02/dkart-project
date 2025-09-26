import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">DKart</Link>
                <div className="search-bar">
                    <input type="text" placeholder="Search for items/categories" />
                </div>
                <div className="header-actions">
                    {user ? (
                        <>
                            <span className="user-name">Hello, {user.name}</span>
                            {/* THIS IS THE NEW CART BUTTON */}
                            <Link to="/cart">
                                <button className="btn btn-cart">Cart</button>
                            </Link>
                            <button onClick={onLogout} className="btn btn-logout">LOGOUT</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button className="btn btn-login">LOGIN</button></Link>
                            <Link to="/register"><button className="btn btn-register">REGISTER</button></Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;