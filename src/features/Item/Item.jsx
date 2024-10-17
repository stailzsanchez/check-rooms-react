import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  changeStatus,
  changeTextProblem,
  changeTextSolution,
  statuses,
} from '../CheckList/checkListSlice';
import './Item.css';

const { OK, EMPTY, PROBLEM, SOLUTION } = statuses;

export const Item = ({ item }) => {
  const { id, title, status, textProblem, textSolution } = item;
  const dispatch = useDispatch();

  const textButtonProblem = textSolution === '' ? 'Проблема' : 'Решено';

  const onStatusClick = (clickStatus) => {
    let newStatus;
    switch (clickStatus) {
      case OK:
        newStatus = status !== OK ? OK : EMPTY;
        break;
      case PROBLEM:
        newStatus = status !== PROBLEM ? PROBLEM : EMPTY;
        break;
      default:
        newStatus = EMPTY;
    }
    dispatch(changeStatus({ id, newStatus }));
  };

  const onChangeTextProblem = (event) => {
    const newText = event.target.value;
    dispatch(changeTextProblem({ id, newText }));
  };
  const onChangeTextSolution = (event) => {
    const newText = event.target.value;
    dispatch(changeTextSolution({ id, newText }));
  };

  const styleOk = () => {
    return status === statuses.OK ? 'button ok' : 'button';
  };

  const styleProblem = () => {
    if (status === PROBLEM && textSolution !== '') {
      return 'button solution';
    }
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
            {textButtonProblem}
          </button>
        </div>
      </div>
      {status === statuses.PROBLEM && (
        <>
          <textarea
            className="problem-textarea"
            value={textProblem}
            onChange={onChangeTextProblem}
            placeholder="Опишите проблему. Минимум 5 символов"
          />
          {textProblem.length >= 5 && (
            <textarea
              className="problem-textarea"
              value={textSolution}
              onChange={onChangeTextSolution}
              placeholder="Опишите решение если решили"
            />
          )}
        </>
      )}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    // check_type_id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    textProblem: PropTypes.string,
    textSolution: PropTypes.string,
  }).isRequired,
};
