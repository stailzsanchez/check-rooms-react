import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRoom, setIsValidRoom, getRooms } from './InputRoomSlice';
import './InputRoom.css';
import { formatLastCheckDate } from 'shared/lib/date/formatLastCheckDate';

export const RoomNumberInput = () => {
  const dispatch = useDispatch();
  const { rooms, isValidRoom, selectedRoom } = useSelector((state) => state.rooms);
  const [inputValue, setInputValue] = useState(selectedRoom?.name || '');
  const [showOptions, setShowOptions] = useState(false);

  const onInputChange = (event) => {
    const inputText = event.target.value;
    setInputValue(inputText);
    isValidInput(inputText);
    setShowOptions(true);
    dispatch(getRooms(inputText));
  };

  const isValidInput = (text) => {
    if (selectedRoom?.id) {
      dispatch(setIsValidRoom(true));
      return;
    }
    const isValid = rooms.some((room) => room.name === text);
    dispatch(setIsValidRoom(isValid));
  };

  const handleRoomSelect = (room) => {
    setInputValue(room.name);
    isValidInput(room.name);
    setShowOptions(false);
    dispatch(setSelectedRoom(room));
  };
  useEffect(() => {
    if (selectedRoom) {
      setInputValue(selectedRoom.name);
      // isValidInput(selectedRoom.name);
    } else {
      setInputValue('');
    }
  }, [selectedRoom]);

  return (
    <div className="room-select">
      {selectedRoom && (
        <div className="last-check-info">
          <h3>Последняя проверка:</h3>
          <p>Дата: {formatLastCheckDate(selectedRoom.date_no_format)}</p>
          <p>Проверил: {selectedRoom.login || 'Нет данных'}</p>
        </div>
      )}
      <div className="input-container">
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
        {isValidRoom && selectedRoom && <span className="valid-room-emoji">✅</span>}
      </div>

      {showOptions && (
        <div className="options-list">
          {rooms
            .filter((room) => room.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((room) => (
              <div
                key={room.id}
                className="option"
                onClick={() => handleRoomSelect(room)}
                onMouseDown={() => handleRoomSelect(room)}
                onTouchStart={() => handleRoomSelect(room)}
              >
                {room.name}
              </div>
            ))}
        </div>
      )}

      {!isValidRoom && <div className="warn-room">Выберите существующий кабинет</div>}
    </div>
  );
};
