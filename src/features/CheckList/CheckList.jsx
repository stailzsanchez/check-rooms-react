import { useSelector, useDispatch } from 'react-redux';

import { Item } from '../Item/Item';
import { changeStatus, setAllOk } from './checkListSlice';
import { RoomNumberInput } from '../InputRoom/InputRoom';
import './CheckList.css';
import { useCallback, useEffect } from 'react';
import { useTelegram } from '../../shared/telegram/useTelegram';

export const CheckList = () => {
  const { items, isActiveSend } = useSelector((state) => state.checkList);
  const dispatch = useDispatch();
  const { tg } = useTelegram();

  const onChangeStatus = (id, newStatus) => {
    dispatch(changeStatus({ id, newStatus }));
  };

  const onAllOkClick = () => {
    dispatch(setAllOk());
  };

  const onSendData = useCallback(() => {
    tg.sendData(JSON.stringify(items));
  }, []);

  // useEffect(() => {
  //     tg.onEvent('mainButtonClicked', onSendData)
  //     return () => {
  //         tg.offEvent('mainButtonClicked', onSendData)
  //     }
  // }, [onSendData])

  // useEffect(() => {
  //     tg.MainButton.setParams({
  //         text: 'Отправить данные'
  //     })
  // }, [])

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
          className={`check-list__button ${isActiveSend ? 'active' : ''}`}
        >
          Отправить
        </button>
        <button className="check-list__button select-all" onClick={onAllOkClick}>
          ✅ Отметить все
        </button>
      </div>
    </div>
  );
};
