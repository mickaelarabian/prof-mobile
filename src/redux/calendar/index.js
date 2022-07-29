import { createSlice } from '@reduxjs/toolkit';

export const calendarStateSlice = createSlice({
  name: 'calendarState',
  initialState: {
    calendar: {},
    lessons: [],
    isHistory: false
  },

  reducers: {
    setCalendarAction: (state, action) => {
      state.calendar = action.payload
    },
    resetAction: (state) => {
      state.calendar = {}
    },
    setLessonsAction: (state, action) => {
      state.lessons = action.payload
    },
    setIsHistoryAction: (state, action) => {
      state.isHistory = action.payload
    }
  },
});

export const {
  setCalendarAction,
  resetAction,
  setLessonsAction,
  setIsHistoryAction
} = calendarStateSlice.actions;
export default calendarStateSlice.reducer;
