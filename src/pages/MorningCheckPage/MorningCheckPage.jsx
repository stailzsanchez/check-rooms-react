import React, { useState, useEffect } from 'react';
import api from '../../app/api/api';
import './MorningCheckPage.css';

export const MorningCheckPage = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await api.get('/morning-rooms');
            setRooms(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка комнат:', error);
        }
    };

    const handleToggleMorningCheck = async (roomId) => {
        try {
            await api.patch(`/rooms/${roomId}/toggle-morning-check`);
            fetchRooms();
        } catch (error) {
            console.error('Ошибка при изменении статуса комнаты:', error);
        }
    };

    return (
        <div className="morning-check-setup">
            <h1 className="morning-check-title">Настройка утренней проверки</h1>
            <div className="room-list">
                <h2 className="room-list-title">Добавлены в утреннюю проверку</h2>
                {rooms.filter(room => room.is_morning_check).map(room => (
                    <div key={room.id} className="room-item">
                        {room.name}
                        <button onClick={() => handleToggleMorningCheck(room.id)} className="toggle-button">
                            ❌
                        </button>
                    </div>
                ))}
                <h2 className="room-list-title">Не добавлены в утреннюю проверку</h2>
                {rooms.filter(room => !room.is_morning_check).map(room => (
                    <div key={room.id} className="room-item">
                        {room.name}
                        <button onClick={() => handleToggleMorningCheck(room.id)} className="toggle-button">
                            ✅
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};