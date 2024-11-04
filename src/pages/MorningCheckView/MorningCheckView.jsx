import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from 'app/api/api';
import { AppRoutes } from 'app/providers/router/routerConfig';
import { goToRoomCheckList } from 'features/InputRoom/InputRoomSlice';
import { Loader } from 'shared/ui/AppLoader/AppLoader';
import { formatLastCheckDate } from 'shared/lib/date/formatLastCheckDate';
import './MorningCheckView.css';

export const MorningCheckView = () => {
  const [rooms, setRooms, loadingRooms] = useState([]);
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
        'Ошибка при получении списка кабинетов для утренней проверки:',
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

  const renderRoomItem = (room) => {
    const renderDate = () => {
      const dateLastCheck = formatLastCheckDate(room.last_check_date);
      if (!room.tg_link) {
        return <span className="room-item__date">{dateLastCheck}</span>;
      }
      const tgLink = `https://${room.tg_link.replace('@', '')}`;
      return (
        <a href={tgLink} className="room-item__date">
          {dateLastCheck}
        </a>
      );
    };

    return (
      <div key={room.id} className="room-item">
        <button onClick={() => onRoomClick(room)} className="go-to-checklist-button">
          🔍 {room.name}{' '}
        </button>
        {renderDate()}
        <span className="room-item__login">{room.last_check_user_name || '-'}</span>
      </div>
    );
  };

  if (loadingRooms) {
    return <Loader />;
  }

  return (
    <div className="morning-check-view">
      <h1 className="morning-check-view__title">Список утренних проверок</h1>
      <h2 className="morning-check-view__subtitle">Не проверенные сегодня</h2>
      {rooms.filter((room) => !room.checked_today).map(renderRoomItem)}
      <h2 className="morning-check-view__subtitle">Проверенные сегодня</h2>
      {rooms.filter((room) => room.checked_today).map(renderRoomItem)}
    </div>
  );
};
