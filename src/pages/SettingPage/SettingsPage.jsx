import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'app/providers/auth/AuthContext';
import { AppRoutes } from 'app/providers/router/routerConfig';
import { exportChecks } from 'features/CheckList/checkListSlice';
import './SettingsPage.css';


export const SettingsPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        logout();
        navigate(AppRoutes.LOGIN_PAGE);
    };

    const handleExport = () => {
        dispatch(exportChecks())
    };

    const handleMorningCheckSetup = () => {
        navigate(AppRoutes.MORNING_CHECK_ROOMS);
    };

    return (
        <div className="settings-page">
            <h1 className="settings-title">Настройки</h1>
            <p className="settings-user-login">Логин пользователя: {user.login}</p>
            <button onClick={handleLogout} className="settings-button">Выйти</button>
            <button onClick={handleExport} className="settings-button">Экспортировать</button>
            {user.role === 'admin' && (
                <button onClick={handleMorningCheckSetup} className="settings-button">Настройка утренней проверки</button>
            )}
        </div>
    );
};
