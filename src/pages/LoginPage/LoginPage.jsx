import React, { useState } from 'react';
import './LoginPage.css';
import { useAuth } from 'app/providers/auth/AuthContext';
import api from 'app/api/api';
import { useEffect } from 'react';

export const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    setIsLoading(true);
    try {
      await authLogin(login, password);
    } catch (err) {
      setError('Ошибка при входе. Проверьте логин и пароль.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchCheckTypes = async () => {
      const res = await api.get(`/get-check-types`);
      console.log(res);
    };
    fetchCheckTypes();
  }, []);

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-form__title">Вход в систему</h2>
        {error && <div className="login-form__error-message">{error}</div>}
        <div className="login-form__group">
          <label htmlFor="login" className="login-form__label">
            Логин
          </label>
          <input
            id="login"
            type="text"
            placeholder="Введите ваш логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="login-form__input"
          />
        </div>
        <div className="login-form__group">
          <label htmlFor="password" className="login-form__label">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-form__input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="login-form__button">
          {isLoading ? <div className="login-form__loader"></div> : 'Войти'}
        </button>
      </form>
    </div>
  );
};
