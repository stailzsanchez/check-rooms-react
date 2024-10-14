import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const statuses = {
  OK: "OK",
  PROBLEM: "PROBLEM",
  EMPTY: "EMPTY",
  SOLUTION: "SOLUTION",
};

const { OK, EMPTY, PROBLEM, SOLUTION } = statuses;

const initCheckTypes = {
  status: statuses.EMPTY,
  textProblem: "",
  textSolution: "",
};

const initialState = {
  items: [
    // {
    //   id: 1,
    //   title: "Планшет снаружи",
    //   status: statuses.EMPTY,
    //   textProblem: "",
    //   textSolution: "",
    // },
    // {
    //   id: 2,
    //   title: "Тач",
    //   status: statuses.EMPTY,
    //   textProblem: "",
    //   textSolution: "",
    // },
    // {
    //   id: 3,
    //   title: "Звук",
    //   status: statuses.EMPTY,
    //   textProblem: "",
    //   textSolution: "",
    // },
    // {
    //   id: 4,
    //   title: "Sboard",
    //   status: statuses.EMPTY,
    //   textProblem: "",
    //   textSolution: "",
    // },
    // {
    //   id: 5,
    //   title: "Пенсил",
    //   status: statuses.EMPTY,
    //   textProblem: "",
    //   textSolution: "",
    // },
    // {
    //   id: 6,
    //   title: "Планшет внутри",
    //   status: statuses.EMPTY,
    //   textProblem: "",
    //   textSolution: "",
    // },
  ],
  isFullChecked: false,
  loadingSend: false,
  errorSend: false,
  loadingGetCheckTypes: false,
  errorGetCheckTypes: false,
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
    // sendCheck: (state, action) => {
    //   const sendData = state.items;
    //   for(const item of sendData) {
    //     if (item.textSolution !== "") {
    //       item.status = SOLUTION;
    //     }
    //   }

    // },
    changeStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.status = newStatus;
        item.textProblem = "";
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
      }
      // state.isFullChecked = checkIsFullChecked(state.items);
    },
    setAllOk: (state) => {
      state.items.forEach((item) => {
        item.status = statuses.OK;
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
  },
});

// AppThunk sets the type definitions for the dispatch method
export const sendCheck = () => {
  // debugger;
  return async (dispatch, getState) => {
    const state = getState();
    console.log("const state = getState();", state);
    dispatch(setLoadingSend(true));
    try {
      const sendData = state.items;
      console.log("const sendData = state.items;", sendData);
      for (const item of sendData) {
        if (item.textSolution !== "") {
          item.status = SOLUTION;
        }
      }
      console.log("sendCheck", sendData);
      const res = await axios.post(
        `${import.meta.env.VITE_API_CHECKROOMS}/send-check`,
        {
          data: sendData,
        }
      );
      console.log("sendCheck", res.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch(setErrorSend(message));
    } finally {
      dispatch(setLoadingSend(false));
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
} = checkListSlice.actions;
export default checkListSlice.reducer;
