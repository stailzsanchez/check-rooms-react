import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRoom } from './InputRoomSlice';
import './InputRoom.css';

export const RoomNumberInput = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.list);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleRoomChange = (event) => {
    const selectedRoom = event.target.value;
    setInputValue(selectedRoom);
    dispatch(setSelectedRoom(selectedRoom));
  };

  return (
    <div className="room-select">
      <label htmlFor="roomSelect">Выберите кабинет:</label>
      <input
        type="text"
        id="roomSelect"
        value={inputValue}
        onChange={handleInputChange}
        list="rooms"
        placeholder="Введите или выберите кабинет"
        required
      />
      <datalist id="rooms">
        {rooms.map((room) => (
          <option key={room.id} value={room.name} />
        ))}
      </datalist>
    </div>
  );
};
