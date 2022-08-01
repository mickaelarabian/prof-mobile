import { createSlice } from '@reduxjs/toolkit';

export const teacherStateSlice = createSlice({
  name: 'teacherState',
  initialState: {
    calendar: {},
    teacher: {}
  },

  reducers: {
    setTeacherAction: (state, action) => {
      state.teacher = action.payload
    },
    setTeacherCalendarAction: (state, action) => {
      state.calendar = action.payload
    },
  },
});

export const {
  setTeacherAction,
  setTeacherCalendarAction
} = teacherStateSlice.actions;
export default teacherStateSlice.reducer;
