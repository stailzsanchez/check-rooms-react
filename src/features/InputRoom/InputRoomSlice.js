import { createSlice } from '@reduxjs/toolkit';
import api from 'app/api/api';

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    selectedRoom: null,
    isValidRoom: false,
    loadingRooms: false,
    errorRooms: '',
  },
  reducers: {
    setRooms: (state, { payload }) => {
      state.rooms = payload;
    },
    setSelectedRoom: (state, action) => {
      const selectedRoom = action.payload;
      // const foundRoom = state.rooms.find((room) => room.name === selectedRoom.name);
      // if (!foundRoom) state.selectedRoom = {};

      state.selectedRoom = selectedRoom;
    },
    setIsValidRoom: (state, action) => {
      state.isValidRoom = action.payload;
    },
    setLoadingRooms: (state, { payload }) => {
      state.loadingRooms = payload;
    },
    setErrorRooms: (state, { payload }) => {
      state.error = payload;
    },
    resetRoomState: (state) => {
      state.selectedRoom = null;
      state.isValidRoom = false;
      // state.rooms = [];
    },
  },
});

export const getRooms = (searchText) => {
  return async (dispatch) => {
    dispatch(setLoadingRooms(true));
    try {
      const res = await api.post(`/rooms`, { searchText });
      dispatch(setRooms(res.data));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch(setErrorRooms(message));
    } finally {
      dispatch(setLoadingRooms(false));
    }
  };
};

export const goToRoomCheckList = (roomId) => {
  return async (dispatch) => {
    try {
      const res = await api.get(`/rooms/${roomId}`);
      dispatch(setSelectedRoom(res.data));
      dispatch(setIsValidRoom(true));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch(setErrorRooms(message));
    }
  };
};

export const {
  setSelectedRoom,
  setIsValidRoom,
  setLoadingRooms,
  setErrorRooms,
  setRooms,
  resetRoomState,
} = roomSlice.actions;
export default roomSlice.reducer;
