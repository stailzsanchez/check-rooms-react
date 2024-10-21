import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRoom, setIsValidRoom, getRooms } from "./InputRoomSlice";
import "./InputRoom.css";

export const RoomNumberInput = () => {
  const dispatch = useDispatch();
  const { rooms, isValidRoom, selectedRoom } = useSelector(
    (state) => state.rooms
  );
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const onInputChange = (event) => {
    const inputText = event.target.value;
    setInputValue(inputText);
    isValidInput(inputText);
    setShowOptions(true);
    dispatch(getRooms(inputText));
  };

  const isValidInput = (text) => {
    const isValid = rooms.some((room) => room.name === text);
    dispatch(setIsValidRoom(isValid));
  };

  const handleRoomSelect = (room) => {
    setInputValue(room.name);
    isValidInput(room.name);
    setShowOptions(false);
    dispatch(setSelectedRoom(room));
    console.log('handleRoomSelect room', room);
  };

  return (
    <div className="room-select">
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
          {rooms
            .filter((room) =>
              room.name.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((room) => (
              <div
                key={room.id}
                className="option"
                onClick={() => handleRoomSelect(room)}
              >
                {room.name}
              </div>
            ))}
        </div>
      )}

      {!isValidRoom && (
        <div className="warn-room">Выберите существующий кабинет</div>
      )}

      {selectedRoom && (
        <div className="last-check-info">
          <h3>Последняя проверка:</h3>
          <p>Дата: {selectedRoom.last_check_date ? new Date(selectedRoom.last_check_date).toLocaleString() : 'Нет данных'}</p>
          <p>Проверил: {selectedRoom.last_check_user_name || 'Нет данных'}</p>
        </div>
      )}
    </div>
  );
}