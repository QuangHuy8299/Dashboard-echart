import { createSlice } from '@reduxjs/toolkit';
import type { OverviewState } from './overview.types';
import { fetchOverviewData } from './overview.thunks';

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverviewData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverviewData.fulfilled, (state, action) => {
        state.loading = false;
        state.kpis = action.payload.kpis;
        state.revenueData = action.payload.revenueData;
        state.categoryDistribution = action.payload.categoryDistribution;
      })
      .addCase(fetchOverviewData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch overview data';
      });
  },
});

export const { clearError } = overviewSlice.actions;
export const overviewReducer = overviewSlice.reducer;
