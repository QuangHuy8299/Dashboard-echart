import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    finishAuthCheck(state) {
      state.isLoading = false;
    },
  },
});

export const { loginSuccess, logout, finishAuthCheck } = authSlice.actions;
export default authSlice.reducer;
