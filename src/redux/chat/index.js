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
     //Reset current messages
     resetCurrentMessagesAction: (state) => {
      state.room = {}
      state.messages = []
    },
    //set new message
    setNewMessageAction: (state, action) => {
      if(state.room.id && action.payload.roomId === state.room.id){
        state.messages = [action.payload, ...state.messages]
        // state.room.last_message = action.payload
      }
      const idx = state.rooms.findIndex(item => item.id === action.payload.roomId)
      if(idx > -1){
        state.rooms[idx].last_message = action.payload
        if(idx !== 0){
          let tmpRoom = state.rooms[idx]
          state.rooms.splice(idx, 1);
          state.rooms.unshift(tmpRoom)
        }
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
  setNewNotification,
  resetCurrentMessagesAction
} = chatStateSlice.actions;
export default chatStateSlice.reducer;
