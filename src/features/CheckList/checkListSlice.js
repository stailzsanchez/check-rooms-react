import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const statuses = {
  OK: "OK",
  PROBLEM: "PROBLEM",
  EMPTY: "EMPTY",
  SOLUTION: "SOLUTION",
};
export const sendStatuses = {
  IDLE: "IDLE",
  SENDING: "SENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};


const { OK, EMPTY, PROBLEM, SOLUTION } = statuses;
const { IDLE, SENDING, SUCCESS, ERROR } = sendStatuses;

const initCheckTypes = {
  status: statuses.EMPTY,
  textProblem: "",
  textSolution: "",
  name_admin: "stas",
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
    if (
      item.status === EMPTY ||
      (item.status === PROBLEM && item.textProblem.length < 5)
    ) {
      isValidReport = false;
      break;
    }
  }

  return isValidReport;
};

const checkListSlice = createSlice({
  name: "checkList",
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
          item.textProblem = "";
          item.textSolution = "";
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
        if (newText !== "") {
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
        item.textProblem = "";
        item.textSolution = "";
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
  },
});

// AppThunk sets the type definitions for the dispatch method
export const sendCheck = (room_id) => {
  return async (dispatch, getState) => {
    dispatch(setSendStatus(SENDING));
    try {
      const items = getState().checkList.items;
      const res = await axios.post(
        `${import.meta.env.VITE_API_CHECKROOMS}/send-check`,
        {
          items: items,
          room_id: room_id,
        }
      );
      dispatch(setSendStatus(SUCCESS));
      dispatch(setResponseData(res.data));
      setTimeout(() => {
        dispatch(setSendStatus(IDLE));
        dispatch(setResponseData(null));
      }, 7000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Неизвестная ошибка";
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
      const res = await axios.get(
        `${import.meta.env.VITE_API_CHECKROOMS}/get-check-types`
      );
      dispatch(initItemsWithTypes(res.data));
      console.log("get-check-types", res.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch(setErrorGetCheckTypes(message));
    } finally {
      dispatch(setLoadingGetCheckTypes(false));
    }
  };
};

export const {
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
