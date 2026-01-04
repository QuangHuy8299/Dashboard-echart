import { createSlice } from '@reduxjs/toolkit';
import type { AnalyticsState } from './analytics.types';

// NOTE: The server-side fields previously stored here are now migrated to
// RTK Query. This slice is reduced to UI-only state (filters, paging, small
// UI flags). Keep the shape stable for components that still read these
// selectors. Remove entirely after full migration.

const initialState: AnalyticsState = {
  // Keep empty defaults — server data is provided by RTK Query now
  salesMetrics: [],
  salesTrend: [],
  ordersTrend: [],
  regionData: [],
  productPerformance: [],
  customerSegments: [],
  conversionFunnel: [],
  // UI-only fields
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAnalytics: () => initialState,
    // Keep UI-only reducers (filters, paging) here as needed
    setLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
  },
  // Remove server-driven extraReducers; RTK Query owns server cache now
});

export const { clearError, resetAnalytics, setLoading, setError } =
  analyticsSlice.actions;
export const analyticsReducer = analyticsSlice.reducer;
