import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

const selectAnalyticsState = (state: RootState) => state.analytics;

export const selectSalesMetrics = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.salesMetrics
);

export const selectSalesTrend = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.salesTrend
);

export const selectOrdersTrend = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.ordersTrend
);

export const selectRegionData = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.regionData
);

export const selectProductPerformance = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.productPerformance
);

export const selectCustomerSegments = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.customerSegments
);

export const selectConversionFunnel = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.conversionFunnel
);

export const selectAnalyticsLoading = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.loading
);

export const selectAnalyticsError = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.error
);

// Derived selectors
export const selectTopProducts = createSelector(
  [selectProductPerformance],
  (products) => {
    return [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }
);

export const selectTotalRegionSales = createSelector(
  [selectRegionData],
  (regions) => {
    return regions.reduce((sum, region) => sum + region.sales, 0);
  }
);

export const selectLast30DaysSales = createSelector(
  [selectSalesTrend],
  (salesTrend) => {
    if (salesTrend.length === 0) return [];
    return salesTrend.slice(-30);
  }
);
