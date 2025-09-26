import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './FormPage.css';
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => { e.preventDefault(); try { await register(name, email, password); navigate('/'); } catch (error) { alert('Failed to register. User may already exist.'); } };
    return (<div className="form-container"><form onSubmit={handleSubmit} className="form-card"><h2>Register</h2><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required /><button type="submit">Register</button></form></div>);
};
export default RegisterPage;