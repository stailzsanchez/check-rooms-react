import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './providers/auth/AuthContext';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { AdminPage } from '../pages/AdminPage';
import { ChecksPage } from '../pages/ChecksPage';
import './style/index.css';
import { AppRouter } from './providers/router/AppRouter';

export const App = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return (
    <AppRouter />
  );
};