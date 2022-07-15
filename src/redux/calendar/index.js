import { createSlice } from '@reduxjs/toolkit';

export const calendarStateSlice = createSlice({
  name: 'caleandarState',
  initialState: {
    calendar: {}
  },

  reducers: {
    setCalendarAction: (state, action) => {
      state.calendar = action.payload
    },
    resetAction: (state) => {
      state.calendar = {}
    }
  },
});

export const {
  setCalendarAction,
  resetAction,
} = calendarStateSlice.actions;
export default calendarStateSlice.reducer;
