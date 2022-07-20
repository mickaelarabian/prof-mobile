import { createSlice } from '@reduxjs/toolkit';

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    lang: 'en',
    mapToken: {
      token: '',
      date: null
    }
  },

  reducers: {
    setLanguageAction: (state, action) => {
      state.lang = action.payload
    },
    setMapTokenAction: (state, action) => {
      state.mapToken = action.payload
    }
  },
});

export const {
  setLanguageAction,
  setMapTokenAction
} = appStateSlice.actions;
export default appStateSlice.reducer;
