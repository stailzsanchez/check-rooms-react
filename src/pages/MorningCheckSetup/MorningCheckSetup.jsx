import React, { useState, useEffect } from 'react';
import api from 'app/api/api';
import './MorningCheckSetup.css';

export const MorningCheckSetup = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get('/morning-rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Ошибка при получении списка кабинетов:', error);
    }
  };

  const handleToggleMorningCheck = async (roomId) => {
    try {
      await api.patch(`/rooms/${roomId}/toggle-morning-check`);
      fetchRooms();
    } catch (error) {
      console.error('Ошибка при изменении статуса кабинета:', error);
    }
  };

  return (
    <div className="morning-check-setup">
      <h1 className="morning-check-setup-title">Настройка утренней проверки</h1>
      <div className="room-lists-container">
        <div className="room-list">
          <h2 className="room-list-title">Добавлены в проверку</h2>
          {rooms
            .filter((room) => room.is_morning_check)
            .map((room) => (
              <div key={room.id} className="room-item">
                <span onClick={() => handleToggleMorningCheck(room.id)} className="toggle-button">
                  ✅
                </span>
                <span className="room-item__name">{room.name}</span>
              </div>
            ))}
        </div>

        <div className="room-list">
          <h2 className="room-list-title">Не добавлены в проверку</h2>
          {rooms
            .filter((room) => !room.is_morning_check)
            .map((room) => (
              <div key={room.id} className="room-item">
                <span onClick={() => handleToggleMorningCheck(room.id)} className="toggle-button">
                  ❌
                </span>
                <span className="room-item__name">{room.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
