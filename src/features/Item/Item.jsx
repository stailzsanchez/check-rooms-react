import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  changeStatus,
  changeTextProblem,
  changeTextSolution,
  statuses,
} from '../CheckList/checkListSlice';
import './Item.css';
import { useRef } from 'react';

const { OK, EMPTY, PROBLEM, SOLUTION } = statuses;

export const Item = ({ item }) => {
  const { id, title, status, textProblem, textSolution } = item;
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  const textButtonProblem = status === SOLUTION ? 'Решено' : 'Проблема';

  const onStatusClick = (clickStatus) => {
    let newStatus;
    switch (clickStatus) {
      case OK:
        newStatus = status !== OK ? OK : EMPTY;
        break;
      case PROBLEM:
        if (status === PROBLEM || status === SOLUTION) {
          newStatus = EMPTY;
        } else {
          newStatus = PROBLEM;
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.focus();
            }
          }, 0);
        }
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
    return status === OK ? 'check-list__button ok' : 'check-list__button';
  };

  const styleProblem = () => {
    if (status === SOLUTION) {
      return 'check-list__button solution';
    }
    return status === PROBLEM ? 'check-list__button problem' : 'check-list__button';
  };

  return (
    <div className="check-list__item">
      <div className="check-list__item-content">
        <span className="check-list__item-title">{title}</span>
        <div className="check-list__button-container">
          <button className={styleOk()} onClick={() => onStatusClick(OK)}>
            ОК
          </button>
          <button className={styleProblem()} onClick={() => onStatusClick(PROBLEM)}>
            {textButtonProblem}
          </button>
        </div>
      </div>
      {(status === PROBLEM || status === SOLUTION) && (
        <>
          <textarea
            ref={textareaRef}
            className="check-list__textarea"
            value={textProblem}
            onChange={onChangeTextProblem}
            placeholder="Опишите проблему. Минимум 5 символов"
          />
          {textProblem.length >= 5 && (
            <textarea
              className="check-list__textarea"
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
    status: PropTypes.string.isRequired,
    textProblem: PropTypes.string,
    textSolution: PropTypes.string,
  }).isRequired,
};
