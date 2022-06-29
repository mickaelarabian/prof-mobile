import { configureStore } from '@reduxjs/toolkit';
import app from './app';
import user from './user';
import chat from './chat';

export default configureStore({
  reducer: { app, user, chat },
});
