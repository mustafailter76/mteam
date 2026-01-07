import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import usersReducer from './userSlice.js';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    cart: cartReducer,
  },
});