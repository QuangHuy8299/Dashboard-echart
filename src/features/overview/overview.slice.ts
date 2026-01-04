import { createSlice } from '@reduxjs/toolkit';
import type { OverviewState } from './overview.types';

const initialState: OverviewState = {
  kpis: [],
  revenueData: [],
  categoryDistribution: [],
  loading: false,
  error: null,
};

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { clearError } = overviewSlice.actions;
export const overviewReducer = overviewSlice.reducer;
