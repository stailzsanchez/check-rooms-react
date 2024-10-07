import { createSlice } from '@reduxjs/toolkit';

export const statuses = {
  OK: 'OK',
  PROBLEM: 'PROBLEM',
  EMPTY: 'EMPTY',
};

const {OK, EMPTY, PROBLEM} = statuses

const initialState = {
  items: [
    { id: 1, title: 'Планшет снаружи', status: statuses.EMPTY, textProblem: '' },
    { id: 2, title: 'Тач', status: statuses.EMPTY, textProblem: '' },
    { id: 3, title: 'Звук', status: statuses.EMPTY, textProblem: '' },
    { id: 4, title: 'Sboard', status: statuses.EMPTY, textProblem: '' },
    { id: 5, title: 'Пенсил', status: statuses.EMPTY, textProblem: '' },
    { id: 6, title: 'Планшет внутри', status: statuses.EMPTY, textProblem: '' },
  ],
  isActiveSend: false
};

const checkIsActiveSend = (items) => {
    let isValidReport = true
      for(const item of items) {
        if(item.status === OK) continue
        if(item.status === EMPTY || (item.status === PROBLEM && item.textProblem.length < 5)) {
            isValidReport = false
            break
        }
      }

      return isValidReport
}

const checkListSlice = createSlice({
  name: 'checkList',
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.status = newStatus;
        item.textProblem = "";
      }
      state.isActiveSend = checkIsActiveSend(state.items)
    },
    changeText: (state, action) => {
      const { id, newText } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.textProblem = newText;
      }
      state.isActiveSend = checkIsActiveSend(state.items)
    },
    setAllOk: (state) => {
      state.items.forEach(item => {
        item.status = statuses.OK;
      });
      state.isActiveSend = checkIsActiveSend(state.items)
    },
  },
});

export const { changeStatus, changeText, setAllOk } = checkListSlice.actions;
export default checkListSlice.reducer;