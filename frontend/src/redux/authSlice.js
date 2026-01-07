import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('userId') || null,
  isAuthenticated: !!localStorage.getItem('userId'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.user_id;
      state.isAuthenticated = true;
      localStorage.setItem('userId', action.payload.user_id);
    },

    logoutSuccess: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userId');
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
