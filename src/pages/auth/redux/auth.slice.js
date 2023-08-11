import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialize: (state, action) => {
      const {
        isAuthenticated,
        user,
      } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    },
    login: (state, action) => {
      const {
        isAuthenticated,
        user,
      } = action.payload;

      return {
        ...state,
        isAuthenticated,
        user,
      };
    },
    logout: (state, action) => {
      localStorage.removeItem("access");
      return { ...initialState, isInitialized: true };
    },
  },
});

export const { initialize, login, logout } = authSlice.actions;

export default authSlice.reducer;

// selectors
export const selectCurrentToken = (state) => state.auth.access;
export const selectCurrentUser = (state) => state.auth.user;
