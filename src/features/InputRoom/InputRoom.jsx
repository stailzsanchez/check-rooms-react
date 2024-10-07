import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRoom } from './InputRoomSlice';
import './InputRoom.css';

export const RoomNumberInput = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.list);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowOptions(true);
  };

  const handleRoomSelect = (roomName) => {
    setInputValue(roomName);
    dispatch(setSelectedRoom(roomName));
    setShowOptions(false);
  };

  return (
    <div className="room-select">
      <label htmlFor="roomSelect">Выберите кабинет:</label>
      <input
        type="text"
        id="roomSelect"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите или выберите кабинет"
        required
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)} // Задержка для клика по опции
      />
      {showOptions && (
        <div className="options-list">
          {rooms
            .filter((room) => room.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((room) => (
              <div key={room.id} className="option" onClick={() => handleRoomSelect(room.name)}>
                {room.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
