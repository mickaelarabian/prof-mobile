import { configureStore } from '@reduxjs/toolkit';
import app from './app';
import user from './user';

export default configureStore({
  reducer: { app, user },
});
