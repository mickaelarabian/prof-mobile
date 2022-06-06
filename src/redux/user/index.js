import { createSlice } from '@reduxjs/toolkit';

export const userStateSlice = createSlice({
  name: 'userState',
  initialState: {
    isAuthenticated: false,
    hasAddress: false,
    user: {},
    token: '',
    expire: ''
  },

  reducers: {
    setUserAction: (state, action) => {
      state.isAuthenticated = true,
      state.hasAddress = action.payload.hasAddress,
      state.user = action.payload.user,
      state.expire = action.payload.expire,
      state.token = action.payload.token
    },
    setUserAddress: (state) => {
      state.hasAddress = true
    },
    resetUserAction: (state) => {
      state.isAuthenticated = false,
      state.hasAddress = false,
      state.user = {},
      state.expire = '',
      state.token = ''
    }
  },
});

export const {
  setUserAction,
  resetUserAction,
  setUserAddress
} = userStateSlice.actions;
export default userStateSlice.reducer;
