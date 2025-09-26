import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './FormPage.css';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => { e.preventDefault(); try { await login(email, password); navigate('/'); } catch (error) { alert('Failed to login. Check credentials.'); } };
    return (<div className="form-container"><form onSubmit={handleSubmit} className="form-card"><h2>Login</h2><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><button type="submit">Login</button></form></div>);
};
export default LoginPage;