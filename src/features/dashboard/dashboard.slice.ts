import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, Theme } from './dashboard.types';

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('ui-theme');
    if (
      savedTheme === 'dark' ||
      savedTheme === 'light' ||
      savedTheme === 'system'
    ) {
      return savedTheme;
    }
  }
  return 'system';
};

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
  theme: getInitialTheme(),
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.data = null;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('ui-theme', action.payload);
    },
  },
});

export const { clearDashboardData, setTheme } = dashboardSlice.actions;
export default dashboardSlice.reducer;
