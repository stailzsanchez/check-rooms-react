import { createSlice } from '@reduxjs/toolkit';
import api from 'app/api/api';
import { format } from 'date-fns';
import { resetRoomState } from '../InputRoom/InputRoomSlice';

export const statuses = {
  OK: 'OK',
  PROBLEM: 'PROBLEM',
  EMPTY: 'EMPTY',
  SOLUTION: 'SOLUTION',
};
export const sendStatuses = {
  IDLE: 'IDLE',
  SENDING: 'SENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const { OK, EMPTY, PROBLEM, SOLUTION } = statuses;
const { IDLE, SENDING, SUCCESS, ERROR } = sendStatuses;

const initCheckTypes = {
  status: statuses.EMPTY,
  textProblem: '',
  textSolution: '',
};

const initialState = {
  items: [],
  isFullChecked: false,
  loadingSend: false,
  errorSend: false,
  loadingGetCheckTypes: false,
  errorGetCheckTypes: false,
  sendStatus: IDLE,
  responseData: null,
};

const checkIsFullChecked = (items) => {
  let isValidReport = true;
  for (const item of items) {
    if (item.status === OK) continue;
    if (item.status === EMPTY || (item.status === PROBLEM && item.textProblem.length < 5)) {
      isValidReport = false;
      break;
    }
  }

  return isValidReport;
};

export const exportChecks = () => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/export-checks`, {
        responseType: 'blob',
      });
      const formattedDate = format(new Date(), 'HH.mm_dd-MM-yyyy');
      const fileName = `checksCU_${formattedDate}.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Ошибка при экспорте проверок:', error);
    }
  };
};

const checkListSlice = createSlice({
  name: 'checkList',
  initialState,
  reducers: {
    initItemsWithTypes: (state, action) => {
      const checkTypes = action.payload;
      const itemsCheck = [];
      for (const { id, name } of checkTypes) {
        itemsCheck.push({ ...initCheckTypes, id: id, title: name });
      }
      state.items = itemsCheck;
    },
    changeStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (newStatus === OK || newStatus === EMPTY) {
          item.textProblem = '';
          item.textSolution = '';
        }
        item.status = newStatus;
        // if (newStatus === PROBLEM && item.textSolution !== "") {
        //   item.status = SOLUTION;
        // }
      }
      state.isFullChecked = checkIsFullChecked(state.items);
    },
    changeTextProblem: (state, action) => {
      const { id, newText } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.textProblem = newText;
      }
      state.isFullChecked = checkIsFullChecked(state.items);
    },
    changeTextSolution: (state, action) => {
      const { id, newText } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.textSolution = newText;
        if (newText !== '') {
          item.status = SOLUTION;
        } else if (item.status === SOLUTION) {
          item.status = PROBLEM;
        }
      }
      state.isFullChecked = checkIsFullChecked(state.items);
    },
    setAllOk: (state) => {
      state.items.forEach((item) => {
        item.status = statuses.OK;
        item.textProblem = '';
        item.textSolution = '';
      });
      state.isFullChecked = checkIsFullChecked(state.items);
    },
    setLoadingSend: (state, { payload }) => {
      state.loadingSend = payload;
    },
    setErrorSend: (state, { payload }) => {
      state.errorSend = payload;
    },
    setLoadingGetCheckTypes: (state, { payload }) => {
      state.loadingSend = payload;
    },
    setErrorGetCheckTypes: (state, { payload }) => {
      state.errorSend = payload;
    },
    setSendStatus: (state, { payload }) => {
      state.sendStatus = payload;
    },
    setResponseData: (state, action) => {
      state.responseData = action.payload;
    },
    resetState: (state) => {
      state.items = state.items.map(item => ({
        ...item,
        status: statuses.EMPTY,
        textProblem: '',
        textSolution: ''
      }));
      // state.isFullChecked = false;
      // state.sendStatus = IDLE;
      // state.responseData = null;
    },
  },
});

export const sendCheck = (room_id, login) => {
  return async (dispatch, getState) => {
    dispatch(setSendStatus(SENDING));
    try {
      const items = getState().checkList.items;
      const res = await api.post(`/send-check`, { items, room_id, login });
      dispatch(setSendStatus(SUCCESS));
      dispatch(setResponseData(res.data));
      dispatch(resetState());
      dispatch(resetRoomState());
      setTimeout(() => {
        dispatch(setSendStatus(IDLE));
        dispatch(setResponseData(null));

      }, 7000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Неизвестная ошибка';
      dispatch(setErrorSend(errorMessage));
      dispatch(setSendStatus(ERROR));
      dispatch(setResponseData(errorMessage));
      setTimeout(() => {
        dispatch(setSendStatus(IDLE));
        dispatch(setResponseData(null));
      }, 7000);
    }
  };
};

export const getCheckTypes = () => {
  return async (dispatch) => {
    dispatch(setLoadingGetCheckTypes(true));
    try {
      const res = await api.get(`/get-check-types`);
      dispatch(initItemsWithTypes(res.data));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch(setErrorGetCheckTypes(message));
    } finally {
      dispatch(setLoadingGetCheckTypes(false));
    }
  };
};

export const {
  resetState,
  changeStatus,
  changeTextProblem,
  changeTextSolution,
  setAllOk,
  setErrorSend,
  initItemsWithTypes,
  setLoadingSend,
  setLoadingGetCheckTypes,
  setErrorGetCheckTypes,
  setSendStatus,
  setResponseData,
} = checkListSlice.actions;
export default checkListSlice.reducer;
