import { useSelector, useDispatch } from 'react-redux';
import { Item } from '../Item/Item';
import {
  changeStatus,
  exportChecks,
  getCheckTypes,
  sendCheck,
  sendStatuses,
  setAllOk,
} from './checkListSlice';
import { RoomNumberInput } from '../InputRoom/InputRoom';
import './CheckList.css';
import { useEffect } from 'react';

const { IDLE, SENDING, SUCCESS, ERROR } = sendStatuses;

const getStatusEmoji = (status) => {
  switch (status) {
    case 'PROBLEM':
      return '❌';
    case 'SOLUTION':
      return '❌🔧';
    default:
      return '';
  }
};

export const CheckList = () => {
  const { items, isFullChecked, sendStatus, responseData } = useSelector(
    (state) => state.checkList,
  );
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
    dispatch(sendCheck(selectedRoom.id));
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
          className={`check-list__button ${isActiveSend ? 'active' : ''}`}
          disabled={sendStatus === SENDING}
        >
          {sendStatus === SENDING ? (
            <>
              Отправка
              <div className="button-loader"></div>
            </>
          ) : (
            'Отправить'
          )}
        </button>
        <button className="check-list__button select-all" onClick={onAllOkClick}>
          ✅ Отметить все
        </button>
        <button className="check-list__button export" onClick={() => dispatch(exportChecks())}>
          📊 Экспорт
        </button>
      </div>
      {!isActiveSend && sendStatus !== SENDING && (
        <div className="warn-fields">Заполните все поля</div>
      )}
      {sendStatus === SUCCESS && responseData && (
        <div className="send-status success">
          Данные отправлены ✅ {responseData.successCount}/{responseData.totalCount}
          {responseData.problemItems && responseData.problemItems.length > 0 && (
            <div className="problem-items">
              {responseData.problemItems.map((item, index) => (
                <div key={index} className="problem-item">
                  {item.title} {getStatusEmoji(item.status)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {sendStatus === ERROR && (
        <div className="send-status error">❌ Ошибка при отправке: {responseData}</div>
      )}
    </div>
  );
};
