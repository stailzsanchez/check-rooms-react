import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import api from 'app/api/api';
import { useAuth } from '../../app/providers/auth/AuthContext';

const initialUser = { login: '', password: '', role: 'user' };

export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(initialUser);
    const { user: userAuth } = useAuth();
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/auth/users`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/auth/add-user`, newUser);
            fetchUsers();
            setNewUser(initialUser);
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await api.delete(`/auth/delete-user/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    };

    const usersUI = users.map(user => {
        const canBeDeleted = user.login !== 'admin' && user.id !== userAuth.id;
        return (
            <tr key={user.id}>
                <td>{user.login}</td>
                <td>{user.role}</td>
                <td>
                    {canBeDeleted && (
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="delete-button"
                        >
                            Удалить
                        </button>
                    )}
                </td>
            </tr>
        )
    });


    return (
        <div className="user-management">
            <h2>Управление пользователями</h2>
            <form onSubmit={handleAddUser} className="add-user-form">
                <input
                    type="text"
                    placeholder="Логин пользователя"
                    value={newUser.login}
                    onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                    <option value="user">Пользователь</option>
                    <option value="admin">Админ</option>
                </select>
                <button type="submit">Добавить пользователя</button>
            </form>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Логин пользователя</th>
                        <th>Роль</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {usersUI}
                </tbody>
            </table>
        </div>
    );
}