import { createSlice } from '@reduxjs/toolkit';
import type { AnalyticsState } from './analytics.types';
import { fetchAnalyticsData } from './analytics.thunks';

const initialState: AnalyticsState = {
  salesMetrics: [],
  salesTrend: [],
  ordersTrend: [],
  regionData: [],
  productPerformance: [],
  customerSegments: [],
  conversionFunnel: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.loading = false;
        state.salesMetrics = action.payload.salesMetrics;
        state.salesTrend = action.payload.salesTrend;
        state.ordersTrend = action.payload.ordersTrend;
        state.regionData = action.payload.regionData;
        state.productPerformance = action.payload.productPerformance;
        state.customerSegments = action.payload.customerSegments;
        state.conversionFunnel = action.payload.conversionFunnel;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics data';
      });
  },
});

export const { clearError, resetAnalytics } = analyticsSlice.actions;
export const analyticsReducer = analyticsSlice.reducer;
