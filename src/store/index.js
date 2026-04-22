import { configureStore } from '@reduxjs/toolkit';
import statusReducer      from './statusSlice';
import authReducer        from './authSlice';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    auth:   authReducer,
  },
});
