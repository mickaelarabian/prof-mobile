import { createSlice } from '@reduxjs/toolkit';

export const chatStateSlice = createSlice({
  name: 'chatState',
  initialState: {
    rooms: [],
    room: {},
    messages: [],
    notifications: false
  },

  reducers: {
    //Récupération des rooms
    setRoomsAction: (state, action) => {
      state.rooms = action.payload
    },
    //Reset du store
    resetAction: (state) => {
      state.rooms = []
      state.room = {}
      state.messages = []
      state.notifications = false
    },
    //Set current room
    setCurrentRoomAction: (state, action) => {
      state.room = action.payload
    },
    //Set current messages
    setCurrentMessagesAction: (state, action) => {
      state.messages = action.payload
    },
    //set new message
    setNewMessageAction: (state, action) => {
      state.notifications = true
      state.messages = [action.payload, ...state.messages]
      // state.rooms = action.payload
    },
    //Reset notifications
    resetNotificationsAction: (state) => {
      state.notifications = false
    },
  },
});

export const {
  setRoomsAction,
  resetAction,
  setCurrentRoomAction,
  setCurrentMessagesAction,
  setNewMessageAction,
  resetNotificationsAction
} = chatStateSlice.actions;
export default chatStateSlice.reducer;
