import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { AppRoutes } from '../router/routerConfig';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (login, password) => {
        try {
            const response = await api.post('/auth/login', { login, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate(AppRoutes.MAIN);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate(AppRoutes.LOGIN_PAGE);
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await api.get('/auth/verify', {
                    headers: { 'x-auth-token': token }
                });
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);



    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);