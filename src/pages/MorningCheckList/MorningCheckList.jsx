import React, { useState, useEffect } from 'react';
import api from 'app/api/api';
import './MorningCheckList.css';

export const MorningCheckList = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchMorningCheckRooms();
    }, []);

    const fetchMorningCheckRooms = async () => {
        try {
            const response = await api.get('/morning-check-rooms');
            setRooms(response.data);
            console.log('fetchMorningCheckRoomsresponse.data', response.data);
        } catch (error) {
            console.error('Ошибка при получении списка комнат для утренней проверки:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                // Перенаправление на страницу входа при ошибке аутентификации
                window.location.href = '/login';
            }
        }
    };

    return (
        <div className="morning-check-list">
            <h1 className="morning-check-list__title">Список утренних проверок</h1>
            <h2 className="morning-check-list__subtitle">Не проверенные сегодня</h2>
            {rooms.filter(room => !room.checked_today).map(room => (
                <div key={room.id} className="room-item">
                    <span>{room.name}</span>
                    <span>{room.last_check_date ? new Date(room.last_check_date).toLocaleString() : 'Нет данных'}</span>
                    <span>{room.last_check_user_name || 'Нет данных'}</span>
                </div>
            ))}
            <h2 className="morning-check-list__subtitle">Проверенные сегодня</h2>
            {rooms.filter(room => room.checked_today).map(room => (
                <div key={room.id} className="room-item">
                    <span>{room.name}</span>
                    <span>{new Date(room.last_check_date).toLocaleString()}</span>
                    <span>{room.last_check_user_name}</span>
                </div>
            ))}
        </div>
    );
};