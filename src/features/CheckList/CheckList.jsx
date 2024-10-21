import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Item } from '../Item/Item';
import './CheckList.css';
import {
  changeStatus,
  exportChecks,
  getCheckTypes,
  sendCheck,
  sendStatuses,
  setAllOk,
  statuses,
} from './checkListSlice';
import { RoomNumberInput } from '../InputRoom/InputRoom';
import { useAuth } from 'app/providers/auth/AuthContext';

const { IDLE, SENDING, SUCCESS, ERROR } = sendStatuses;
const { OK, EMPTY, PROBLEM, SOLUTION } = statuses;

const statusEmojis = {
  [PROBLEM]: '❌',
  [SOLUTION]: '🔧',
};

const getStatusEmoji = (status) => statusEmojis[status] || '';

export const CheckList = () => {
  const { items, isFullChecked, sendStatus, responseData } = useSelector(
    (state) => state.checkList,
  );
  const { selectedRoom, isValidRoom } = useSelector((state) => state.rooms);
  const { user } = useAuth();
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
    dispatch(sendCheck(selectedRoom.id, user.login));
  };

  useEffect(() => {
    dispatch(getCheckTypes());
  }, []);

  return (
    <div className="check-list">
      <RoomNumberInput />

      <div className="items">
        {items.map((item) => (
          <Item key={item.id} item={item} onChangeStatus={onChangeStatus} />
        ))}
      </div>
      <div className="check-list__controls">
        <button
          onClick={onSendData}
          className={`check-list__button-send ${isActiveSend ? 'active' : ''}`}
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
        <button className="check-list__button-all-ok" onClick={onAllOkClick}>
          ✅ Всё ок
        </button>
        {/* <button className="check-list__button-export" onClick={() => dispatch(exportChecks())}>
          📊 Экспорт
        </button> */}
      </div>
      {!isActiveSend && sendStatus !== SENDING && (
        <div className="warn-fields">Заполните все поля</div>
      )}
      {sendStatus === SUCCESS && responseData && (
        <div className="send-status success">
          Данные отправлены {responseData.roomName}✅ {responseData.successCount}/{responseData.totalCount}
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
