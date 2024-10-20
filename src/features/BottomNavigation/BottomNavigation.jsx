import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BottomNavigation.css';

const BottomNavigation = () => {
    const location = useLocation();

    return (
        <nav className="bottom-nav">
            {['/checks', '/admin'].map((path, index) => (
                <Link to={path} key={path} className="nav-item">
                    <motion.div
                        className={`nav-icon ${location.pathname === path ? 'active' : ''}`}
                        whileTap={{ scale: 0.9 }}
                    >
                        <i className={`fas ${getIcon(index)}`}></i>
                    </motion.div>
                    <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: location.pathname === path ? 0 : 10, opacity: location.pathname === path ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {getLabel(index)}
                    </motion.span>
                </Link>
            ))}
        </nav>
    );
};

const getIcon = (index) => {
    const icons = ['fa-home', 'fa-clipboard-check', 'fa-user-cog'];
    return icons[index];
};

const getLabel = (index) => {
    const labels = ['Проверки', 'Админ'];
    return labels[index];
};

export default BottomNavigation;