import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeStatus, changeText, statuses } from '../CheckList/checkListSlice';
import './Item.css';

export const Item = ({ item }) => {
  const { id, title, status, textProblem } = item;
  const dispatch = useDispatch();

  const onStatusClick = (clickStatus) => {
    let newStatus;
    switch (clickStatus) {
      case statuses.OK:
        newStatus = status !== statuses.OK ? statuses.OK : statuses.EMPTY;
        break;
      case statuses.PROBLEM:
        newStatus = status !== statuses.PROBLEM ? statuses.PROBLEM : statuses.EMPTY;
        break;
      default:
        newStatus = statuses.EMPTY;
    }
    dispatch(changeStatus({ id, newStatus }));
  };

  const onChangeTextProblem = (event) => {
    const newText = event.target.value;
    dispatch(changeText({ id, newText }));
  };

  const styleOk = () => {
    return status === statuses.OK ? 'button ok' : 'button';
  };

  const styleProblem = () => {
    return status === statuses.PROBLEM ? 'button problem' : 'button';
  };

  return (
    <div className="item">
      <div className="item-content">
        <span className="item-title">{title}</span>
        <div className="button-container">
          <button className={styleOk()} onClick={() => onStatusClick(statuses.OK)}>
            ОК
          </button>
          <button className={styleProblem()} onClick={() => onStatusClick(statuses.PROBLEM)}>
            Проблема
          </button>
        </div>
      </div>
      {status === statuses.PROBLEM && (
        <textarea
          className="problem-textarea"
          value={textProblem}
          onChange={onChangeTextProblem}
          placeholder="Опишите проблему. Минимум 5 символов"
        />
      )}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    textProblem: PropTypes.string,
  }).isRequired,
};
