import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRoom, setIsValidRoom, getRooms } from "./InputRoomSlice";
import "./InputRoom.css";
import { useTelegram } from "../../shared/telegram/useTelegram";

export const RoomNumberInput = () => {
  const dispatch = useDispatch();
  const { rooms, isValidRoom, selectedRoom } = useSelector(
    (state) => state.rooms
  );
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const { user } = useTelegram();

  const lastCheckTime = selectedRoom.date?.split(" ")[1];
  const lastCheckDate = selectedRoom.date?.split(" ")[0];
  const lastCheckNameAdmin = selectedRoom?.name_admin;

  console.log(selectedRoom);

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

  const handleRoomSelect = (roomName) => {
    setInputValue(roomName);
    isValidInput(roomName);
    setShowOptions(false);
    dispatch(setSelectedRoom(roomName));
  };

  // const LastCheckUI = !!selectedRoom.id && (
  //   <div className="last-check__wrap">
  //     <span className="last-check__time">
  //       {selectedRoom.date.split(" ")[1]}
  //     </span>
  //     <span className="last-check__date">
  //       {selectedRoom.date.split(" ")[0]}
  //     </span>
  //     <span className="last-check__admin">{selectedRoom.name_admin}</span>
  //   </div>
  // );

  const LastCheckUI = !!lastCheckDate && (
    <div className="last-check__wrap">
      {`Последняя проверка ${lastCheckTime} ${lastCheckDate} ${lastCheckNameAdmin}`}
    </div>
  );

  return (
    <div className="room-select">
      <label htmlFor="roomSelect">
        Привет {`*username - в работе*`} {user}
      </label>
      {LastCheckUI}
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
                onClick={() => handleRoomSelect(room.name)}
              >
                {room.name}
              </div>
            ))}
        </div>
      )}

      {!isValidRoom && (
        <div className="warn-room">Выберите существующий кабинет</div>
      )}
    </div>
  );
};
