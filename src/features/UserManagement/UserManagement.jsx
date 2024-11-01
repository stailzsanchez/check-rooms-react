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
        headers: { 'x-auth-token': localStorage.getItem('token') },
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

  const usersUI = users.map((user) => {
    const canBeDeleted = user.login !== 'admin' && user.id !== userAuth.id;
    return (
      <tr key={user.id}>
        <td>
          <div>{user.login}</div>
          {user.tg_name && (
            <a href={`https://t.me/${user.tg_name.replace('@', '')}`} className="user-tg-name">
              {user.tg_name}
            </a>
          )}
        </td>
        <td>{user.role}</td>
        <td>
          {canBeDeleted && (
            <button onClick={() => handleDeleteUser(user.id)} className="delete-button">
              Удалить
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="user-management">
      <h2 className="user-management-title">Управление пользователями</h2>
      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          placeholder="Telegram name @user"
          value={newUser.tg_name}
          className="add-user-form__input"
          onChange={(e) => setNewUser({ ...newUser, tg_name: e.target.value })}
          autoComplete="off"
          required
        />
        <input
          type="text"
          placeholder="Логин"
          value={newUser.login}
          className="add-user-form__input"
          onChange={(e) => setNewUser({ ...newUser, login: e.target.value })}
          required
          autoComplete="new-login"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={newUser.password}
          className="add-user-form__input"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
          autoComplete="new-password"
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
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Логин пользователя</th>
              <th>Роль</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>{usersUI}</tbody>
        </table>
      </div>
    </div>
  );
};
