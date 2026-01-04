import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { analyticsApi } from '@/services/analytics.api';

const selectAnalyticsState = (state: RootState) => state.analytics;
const selectAnalyticsCache = (state: RootState) =>
  analyticsApi.endpoints.getAnalytics.select(undefined)(state);

// Helpers that prefer RTK Query cache when available, otherwise fall back to slice
export const selectSalesMetrics = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) => cache.data?.salesMetrics ?? analytics.salesMetrics
);

export const selectSalesTrend = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) => cache.data?.salesTrend ?? analytics.salesTrend
);

export const selectOrdersTrend = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) => cache.data?.ordersTrend ?? analytics.ordersTrend
);

export const selectRegionData = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) => cache.data?.regionData ?? analytics.regionData
);

export const selectProductPerformance = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) =>
    cache.data?.productPerformance ?? analytics.productPerformance
);

export const selectCustomerSegments = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) =>
    cache.data?.customerSegments ?? analytics.customerSegments
);

export const selectConversionFunnel = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) =>
    cache.data?.conversionFunnel ?? analytics.conversionFunnel
);

export const selectAnalyticsLoading = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) => cache?.status === 'pending' || analytics.loading
);

export const selectAnalyticsError = createSelector(
  [selectAnalyticsCache, selectAnalyticsState],
  (cache, analytics) =>
    cache?.status === 'rejected' ? 'Failed to load analytics' : analytics.error
);

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
