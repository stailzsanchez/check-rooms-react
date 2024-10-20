import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './providers/auth/AuthContext';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { AdminPage } from '../pages/AdminPage';
import { ChecksPage } from '../pages/ChecksPage';

export const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
      <Route
        path="/"
        element={isAuthenticated ? <ChecksPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin"
        element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/checks"
        element={isAuthenticated ? <ChecksPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};