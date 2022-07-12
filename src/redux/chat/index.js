import { createSlice } from '@reduxjs/toolkit';

export const chatStateSlice = createSlice({
  name: 'chatState',
  initialState: {
    rooms: [],
    room: {},
    messages: [],
    notifications: 0
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
      state.notifications = 0
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
      state.messages = [action.payload, ...state.messages]
      state.room.last_message = action.payload
      const idx = state.rooms.findIndex(item => item.id === action.payload.roomId)
      console.log('idx', idx)
      if(idx > -1){
        console.log('action.payload.content')
        state.rooms[idx].last_message = action.payload
      }
    },
    setNewNotification: (state) => {
      state.notifications = state.notifications + 1
    },
    //Reset notifications
    resetNotificationsAction: (state) => {
      state.notifications = 0
    },
    //set new room
    setNewRoomAction: (state, action) => {
      state.rooms = [action.payload, ...state.rooms]
      state.notifications = state.notifications + 1
    }
  },
});

export const {
  setRoomsAction,
  resetAction,
  setCurrentRoomAction,
  setCurrentMessagesAction,
  setNewMessageAction,
  resetNotificationsAction,
  setNewRoomAction,
  setNewNotification
} = chatStateSlice.actions;
export default chatStateSlice.reducer;
