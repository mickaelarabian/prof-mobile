import { createSlice } from '@reduxjs/toolkit';

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    lang: 'en',
  },

  reducers: {
    setLanguageAction: (state, action) => {
      state.lang = action.payload
    }
  },
});

export const {
  setLanguageAction
} = appStateSlice.actions;
export default appStateSlice.reducer;
