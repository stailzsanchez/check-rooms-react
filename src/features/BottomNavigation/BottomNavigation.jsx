import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BottomNavigation.css';
import { useAuth } from '../../app/providers/auth/AuthContext';

const BottomNavigation = () => {
    const location = useLocation();
    const { user } = useAuth();
    console.log("BottomNavigation user", user);

    const navItems = [
        { path: '/checks', icon: '🏠', label: 'Проверки' },
    ];

    if (user && user.role === 'admin') {
        navItems.push({ path: '/admin', icon: '👤', label: 'Админ' });
    }

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <Link to={item.path} key={item.path} className="nav-item">
                    <motion.div
                        className={`nav-icon ${location.pathname === item.path ? 'active' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {item.icon}
                    </motion.div>
                    {/* <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: location.pathname === item.path ? 0 : 10, opacity: location.pathname === item.path ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {item.label}
                    </motion.span> */}
                </Link>
            ))}
        </nav>
    );
};

export default BottomNavigation;