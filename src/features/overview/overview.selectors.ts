import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

const selectOverviewState = (state: RootState) => state.overview;

export const selectKPIMetrics = createSelector(
  [selectOverviewState],
  (overview) => overview.kpis
);

export const selectRevenueData = createSelector(
  [selectOverviewState],
  (overview) => overview.revenueData
);

export const selectCategoryDistribution = createSelector(
  [selectOverviewState],
  (overview) => overview.categoryDistribution
);

export const selectOverviewLoading = createSelector(
  [selectOverviewState],
  (overview) => overview.loading
);

export const selectOverviewError = createSelector(
  [selectOverviewState],
  (overview) => overview.error
);

export const selectLast30DaysRevenue = createSelector(
  [selectRevenueData],
  (revenueData) => {
    if (revenueData.length === 0) return [];
    return revenueData.slice(-30);
  }
);
