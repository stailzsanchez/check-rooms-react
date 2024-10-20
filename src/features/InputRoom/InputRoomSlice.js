import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api/api";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [
      // {
      //   id: 1,
      //   name: "B104",
      //   date: "2023-09-01 10:10:10",
      //   name_admin: "stas",
      // },
      // { id: 2, name: "B202" },
      // { id: 3, name: "B203" },
      // { id: 4, name: "B204" },
      // { id: 5, name: "B205" },
      // { id: 6, name: "B206" },
      // { id: 7, name: "F201" },
      // { id: 8, name: "F202" },
      // { id: 9, name: "F203" },
      // { id: 10, name: "F204" },
    ],
    selectedRoom: {},
    isValidRoom: false,
    loadingRooms: false,
    errorRooms: "",
  },
  reducers: {
    setRooms: (state, { payload }) => {
      state.rooms = payload;
    },
    setSelectedRoom: (state, action) => {
      const selectedRoomName = action.payload;
      const foundRoom = state.rooms.find(
        (room) => room.name === selectedRoomName
      );
      if (!foundRoom) state.selectedRoom = {};
      state.selectedRoom = foundRoom;
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
  },
});

// AppThunk sets the type definitions for the dispatch method
export const getRooms = (searchText) => {
  return async (dispatch) => {
    dispatch(setLoadingRooms(true));
    try {
      const res = await api.post(`/rooms`, { searchText });
      dispatch(setRooms(res.data));
      // console.log("searchText", searchText);
      // console.log("getRooms", res.data);
      // if (res.data.length !== 0) {
      //   dispatch(setSelectedLogon(res.data[0]));
      // }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      dispatch(setErrorRooms(message));
    } finally {
      dispatch(setLoadingRooms(false));
    }
  };
};

export const {
  setSelectedRoom,
  setIsValidRoom,
  setLoadingRooms,
  setErrorRooms,
  setRooms,
} = roomSlice.actions;
export default roomSlice.reducer;
