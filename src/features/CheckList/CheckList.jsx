import { useSelector, useDispatch } from "react-redux";

import { Item } from "../Item/Item";
import { changeStatus, getCheckTypes, sendCheck, setAllOk } from "./checkListSlice";
import { RoomNumberInput } from "../InputRoom/InputRoom";
import "./CheckList.css";
import { useEffect } from "react";

export const CheckList = () => {
  const { items, isFullChecked } = useSelector((state) => state.checkList);
  const { selectedRoom, isValidRoom } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const isActiveSend = isFullChecked && isValidRoom;

  const onChangeStatus = (id, newStatus) => {
    dispatch(changeStatus({ id, newStatus }));
  };

  const onAllOkClick = () => {
    dispatch(setAllOk());
  };

  const onSendData = () => {
    if (!isActiveSend) return;
    dispatch(sendCheck())
    console.log("onSendData");
    console.log("isActiveSend", isActiveSend);
  };

  useEffect(() => {
    dispatch(getCheckTypes());
  }, []);

  return (
    <div className="check-list">
      <RoomNumberInput />

      <div className="items">
        {items.map((item) => (
          <Item key={item.title} item={item} onChangeStatus={onChangeStatus} />
        ))}
      </div>
      <div className="check-list__controls">
        <button
          onClick={onSendData}
          className={`check-list__button ${isActiveSend ? "active" : ""}`}
        >
          Отправить
        </button>
        <button
          className="check-list__button select-all"
          onClick={onAllOkClick}
        >
          ✅ Отметить все
        </button>
      </div>
      {!isActiveSend && <div className="warn-fields">Заполните все поля</div>}
    </div>
  );
};
