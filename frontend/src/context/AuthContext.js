import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const API_URL = 'http://localhost:5000/api/auth/';
    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get(API_URL + 'me');
                    setUser(response.data);
                } catch (error) { logout(); }
            }
            setLoading(false);
        };
        fetchUser();
    }, [token]);
    const login = async (email, password) => { const response = await axios.post(API_URL + 'login', { email, password }); localStorage.setItem('token', response.data.token); setToken(response.data.token); setUser(response.data); };
    const register = async (name, email, password) => { const response = await axios.post(API_URL + 'register', { name, email, password }); localStorage.setItem('token', response.data.token); setToken(response.data.token); setUser(response.data); };
    const logout = () => { localStorage.removeItem('token'); setToken(null); setUser(null); delete axios.defaults.headers.common['Authorization']; };
    return (<AuthContext.Provider value={{ user, token, login, register, logout, loading }}>{children}</AuthContext.Provider>);
};
export default AuthContext;