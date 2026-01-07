import { createSlice } from '@reduxjs/toolkit';

const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
  items: storedCart,
  isOpen: false 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find(
        item => item.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.isOpen = false;
      localStorage.removeItem('cartItems');
    },

    openCart: (state) => {
      state.isOpen = true; 
    },

    closeCart: (state) => {
      state.isOpen = false;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  openCart,
  closeCart
} = cartSlice.actions;

export default cartSlice.reducer;