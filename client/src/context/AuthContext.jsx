import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

// Use environment variable in production, or relative path (proxy) in development
const API_URL = import.meta.env.VITE_API_URL || '/api';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)

    // Configure axios defaults
    axios.defaults.withCredentials = false; // JWT is handled via response body/header usually, or cookie. 
    // If using Bearer token:
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            // Validate token and get user data
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
            } else {
                // Invalid token
                localStorage.removeItem('token');
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error('Auth check failed:', err);
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(user);
                setIsAuthenticated(true);
                return { success: true };
            }
            return { success: false, error: response.data.message || 'Login failed' };
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please check connection.';
            setError(msg);
            return { success: false, error: msg };
        }
    }

    const register = async (userData) => {
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            if (response.data.success) {
                return { success: true, message: response.data.message };
            }
            return { success: false, error: response.data.message };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Registration failed' };
        }
    }

    const verifyEmail = async (userId, otp) => {
        try {
            const response = await axios.post(`${API_URL}/auth/verify-email`, { userId, otp });
            return response.data;
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Verification failed' };
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setIsAuthenticated(false);
    }

    const updateUser = async (updates) => {
        try {
            const response = await axios.put(`${API_URL}/user/profile`, updates);
            if (response.data.success) {
                setUser(response.data.user);
                return { success: true };
            }
            return { success: false, error: response.data.message };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Update failed' };
        }
    }

    const value = {
        user,
        loading,
        isAuthenticated,
        error,
        login,
        register,
        verifyEmail,
        logout,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
