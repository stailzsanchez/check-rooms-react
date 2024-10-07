import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        list: [
            { id: 1, name: 'B201' },
            { id: 2, name: 'B202' },
            { id: 3, name: 'B203' },
            { id: 4, name: 'B204' },
            { id: 5, name: 'B205' },
            { id: 6, name: 'B206' },
            { id: 7, name: 'F201' },
            { id: 8, name: 'F202' },
            { id: 9, name: 'F203' },
            { id: 10, name: 'F204' },
        ],
        selectedRoom: '',
    },
    reducers: {
        setSelectedRoom: (state, action) => {
            state.selectedRoom = action.payload;
        },
    },
});

export const { setSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;