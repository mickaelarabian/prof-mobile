import { createSlice } from '@reduxjs/toolkit';

export const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    lang: 'en',
    isLoading: false,
    mapToken: {
      token: '',
      date: null
    },
    subjects: [],
    searchedName: null,
    selectedSubject: null,
    selectedDate: null,
    selectedPreference: false
  },

  reducers: {
    setLanguageAction: (state, action) => {
      state.lang = action.payload
    },
    setMapTokenAction: (state, action) => {
      state.mapToken = action.payload
    },
    setSubjectsAction: (state, action) => {
      state.subjects = action.payload
    },
    setFiltersAction: (state, action) => {
      state.searchedName = action.payload.searchedName
      state.selectedSubject = action.payload.selectedSubject
      state.selectedDate = action.payload.selectedDate
      state.selectedPreference = action.payload.selectedPreference
    },
    setIsLoadingAction: (state, action) => {
      state.isLoading = action.payload
    }
  },
});

export const {
  setLanguageAction,
  setMapTokenAction,
  setSubjectsAction,
  setFiltersAction,
  setIsLoadingAction
} = appStateSlice.actions;
export default appStateSlice.reducer;
