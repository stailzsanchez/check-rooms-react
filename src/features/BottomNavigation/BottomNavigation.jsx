import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BottomNavigation.css';
import { useAuth } from '../../app/providers/auth/AuthContext';
import { AppRoutes } from '../../app/providers/router/routerConfig';

const BottomNavigation = () => {
    const location = useLocation();
    const { user } = useAuth();
    console.log("BottomNavigation user", user);


    const navItems = [
        { path: AppRoutes.MAIN, icon: '✅', label: 'Проверки' },
        { path: AppRoutes.MORNING_CHECK_LIST, icon: '🌞', label: 'Утренняя проверка' },
        { path: AppRoutes.SETTINGS_PAGE, icon: '⚙️', label: 'Настройки' },


    ];

    if (user && user.role === 'admin') {
        navItems.push(
            { path: AppRoutes.ADMIN_PAGE, icon: '👤', label: 'Админ' },
        );
    }

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <Link to={item.path} key={item.path + item.label} className="nav-item">
                    <div
                        className={`nav-icon ${location.pathname === item.path ? 'active' : ''}`}
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.9 }}
                    >
                        {item.icon}
                    </div>
                </Link>
            ))}
        </nav>
    );
};

export default BottomNavigation;