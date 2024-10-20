import React from 'react';
import { useAuth } from './providers/auth/AuthContext';
import { AppRouter } from './providers/router/AppRouter';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import BottomNavigation from 'features/BottomNavigation/BottomNavigation';
import './style/index.css';

export const App = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return (
    <div className="app-container">
      <div className="app-content">
        <AppRouter />
      </div>
      <BottomNavigation />
    </div>
  );
};
