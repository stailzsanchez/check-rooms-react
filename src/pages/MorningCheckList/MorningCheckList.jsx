import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from 'app/api/api';
import { formatLastCheckDate } from 'shared/lib/date/formatLastCheckDate';
import './MorningCheckList.css';
import { AppRoutes } from 'app/providers/router/routerConfig';
import { goToRoomCheckList } from '../../features/InputRoom/InputRoomSlice';

export const MorningCheckList = () => {
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMorningCheckRooms();
  }, []);

  const fetchMorningCheckRooms = async () => {
    try {
      const response = await api.get('/morning-check-rooms');
      setRooms(response.data);
    } catch (error) {
      console.error(
        'Ошибка при получении списка комнат для утренней проверки:',
        error.response?.data || error.message,
      );
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  const onRoomClick = (room) => {
    dispatch(goToRoomCheckList(room.id));
    navigate(AppRoutes.MAIN);
  };

  const renderRoomItem = (room) => (
    <div key={room.id} className="room-item">
      <button onClick={() => onRoomClick(room)} className="go-to-checklist-button">
        🔍 {room.name}
      </button>
      <span>{formatLastCheckDate(room.last_check_date)}</span>
      <span>{room.last_check_user_name || '-'}</span>
    </div>
  );

  return (
    <div className="morning-check-list">
      <h1 className="morning-check-list__title">Список утренних проверок</h1>
      <h2 className="morning-check-list__subtitle">Не проверенные сегодня</h2>
      {rooms.filter((room) => !room.checked_today).map(renderRoomItem)}
      <h2 className="morning-check-list__subtitle">Проверенные сегодня</h2>
      {rooms.filter((room) => room.checked_today).map(renderRoomItem)}
    </div>
  );
};
