import type { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

const selectDashboardState = (state: RootState) => state.dashboard;

export const selectDashboardData = createSelector(
  selectDashboardState,
  (state) => state.data
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.loading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error
);

export const selectPieChartData = createSelector(
  selectDashboardData,
  (data) => data?.pieChartData || []
);
