import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRoom, setIsValidRoom } from './InputRoomSlice';
import './InputRoom.css';
import { useTelegram } from '../../shared/telegram/useTelegram';

export const RoomNumberInput = () => {
  const dispatch = useDispatch();
  const { list, isValidRoom} = useSelector((state) => state.rooms);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const { user } = useTelegram();

  const onInputChange = (event) => {
    const value = event.target.value
    setInputValue(value);
    isValidInput(value)
    setShowOptions(true);
  };

  const isValidInput = (text) => {
    const isValid = list.some(room => room.name === text);
    dispatch(setIsValidRoom(isValid))
  }

  const handleRoomSelect = (roomName) => {
    setInputValue(roomName);
    dispatch(setSelectedRoom(roomName));
    isValidInput(roomName)
    setShowOptions(false);
  };

  return (
    <div className="room-select">
      <label htmlFor="roomSelect">Привет {`*username - в работе*`} {user}</label>
      <input
        type="text"
        id="roomSelect"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Введите кабинет"
        required
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
      />
      {showOptions && (
        <div className="options-list">
          {list
            .filter((room) => room.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((room) => (
              <div key={room.id} className="option" onClick={() => handleRoomSelect(room.name)}>
                {room.name}
              </div>
            ))}
        </div>
      )}
      {
        !isValidRoom && <div className='warn-room'>Выберите существующий кабинет</div>
      }
    </div>
  );
};
