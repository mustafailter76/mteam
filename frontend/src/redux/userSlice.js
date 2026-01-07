import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.status = 'succeeded';
    },

    updateProfileBalance: (state, action) => {
      if (state.profile) {
        state.profile.balance = action.payload;
      }
    },

    clearProfile: (state) => {
      state.profile = null;
      state.status = 'idle';
    },
  },
});

export const {
  setProfile,
  updateProfileBalance,
  clearProfile,
} = userSlice.actions;

export default userSlice.reducer;
