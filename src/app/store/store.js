import { configureStore } from '@reduxjs/toolkit';
import checkListReducer from '../../features/CheckList/checkListSlice';
import roomReducer from '../../features/InputRoom/InputRoomSlice';

export const store = configureStore({
  reducer: {
    checkList: checkListReducer,
    rooms: roomReducer,
  },
});