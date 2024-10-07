import { useSelector, useDispatch } from 'react-redux';

import { Item } from '../Item/Item';
import { changeStatus, setAllOk, statuses } from './checkListSlice';
import { RoomNumberInput } from '../InputRoom/InputRoom';
import './CheckList.css';
import { useCallback, useEffect } from 'react';
import { useTelegram } from '../../shared/telegram/useTelegram';

export const CheckList = () => {
  const { items, isActiveSend } = useSelector((state) => state.checkList);
  const { selectedRoom } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  const { tg, user } = useTelegram();

  const onChangeStatus = (id, newStatus) => {
    dispatch(changeStatus({ id, newStatus }));
  };

  const onAllOkClick = () => {
    dispatch(setAllOk());
  };

  const onSendData = () => {
    const data = { items: items, selectedRoom: selectedRoom };
    tg.sendData(JSON.stringify(data));
  };

  const validateSendData = (items) => {
    const isAllOK = items.every((item) => item.status === statuses.OK);

    if (isAllOK) {
      return `✅ В ${selectedRoom} всё ок - ${user}`;
    } else {
      const text = items
        .map(({ title, textProblem, status }) => {
          if (status === statuses.PROBLEM) {
            return `❌ ${title}: ${textProblem}`;
          } else if (status === statuses.OK) {
            return `✅ ${title}`;
          }
          return '';
        })
        .filter(Boolean)
        .join('\n'); // Убираем пустые строки и соединяем с новой строки

      return `${user} - проблемы в ${selectedRoom}:\n${text}`;
    }
  };

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
