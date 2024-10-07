import { useSelector, useDispatch } from 'react-redux';
import { Item } from '../Item/Item';
import { changeStatus, setAllOk } from './checkListSlice';
import { RoomNumberInput } from '../InputRoom/InputRoom';
import './CheckList.css';

export const CheckList = () => {
  const { items, isActiveSend } = useSelector((state) => state.checkList);
  const dispatch = useDispatch();

  const onChangeStatus = (id, newStatus) => {
    dispatch(changeStatus({ id, newStatus }));
  };

  const onAllOkClick = () => {
    dispatch(setAllOk());
  };

  return (
    <div className="check-list">
      <RoomNumberInput />

      <div className="items">
        {items.map((item) => (
          <Item key={item.title} item={item} onChangeStatus={onChangeStatus} />
        ))}
      </div>
      <div className="check-list__controls">
        <button className={`check-list__button ${isActiveSend ? 'active' : ''}`}>Отправить</button>
        <button className="check-list__button select-all" onClick={onAllOkClick}>
          ✅ Отметить все
        </button>
      </div>
    </div>
  );
};
