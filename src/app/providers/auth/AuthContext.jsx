import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { AppRoutes } from '../router/routerConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (login, password) => {
        try {
            const response = await api.post('/auth/login', { login, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            setUser({
                role: response.data.role,
                login: response.data.login,
                id: response.data.id
            });
            navigate(AppRoutes.MAIN);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        navigate(AppRoutes.LOGIN_PAGE);
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await api.get('/auth/verify', {
                    headers: { 'x-auth-token': token }
                });
                setIsAuthenticated(true);
                setUser(
                    {
                        role: response.data.user.role,
                        id: response.data.user.id,
                        login: response.data.user.login
                    }
                );
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
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};