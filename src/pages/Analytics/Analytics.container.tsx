import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  selectSalesMetrics,
  selectSalesTrend,
  selectOrdersTrend,
  selectRegionData,
  selectProductPerformance,
  selectCustomerSegments,
  selectConversionFunnel,
  selectAnalyticsLoading,
  selectAnalyticsError,
} from '@/features/analytics/analytics.selectors';
import { fetchAnalyticsData } from '@/features/analytics/analytics.thunks';
import { AnalyticsView } from './Analytics.view';

export const AnalyticsContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const salesMetrics = useAppSelector(selectSalesMetrics);
  const salesTrend = useAppSelector(selectSalesTrend);
  const ordersTrend = useAppSelector(selectOrdersTrend);
  const regionData = useAppSelector(selectRegionData);
  const productPerformance = useAppSelector(selectProductPerformance);
  const customerSegments = useAppSelector(selectCustomerSegments);
  const conversionFunnel = useAppSelector(selectConversionFunnel);
  const loading = useAppSelector(selectAnalyticsLoading);
  const error = useAppSelector(selectAnalyticsError);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchAnalyticsData());
  };

  return (
    <AnalyticsView
      salesMetrics={salesMetrics}
      salesTrend={salesTrend}
      ordersTrend={ordersTrend}
      regionData={regionData}
      productPerformance={productPerformance}
      customerSegments={customerSegments}
      conversionFunnel={conversionFunnel}
      loading={loading}
      error={error}
      onRetry={handleRetry}
    />
  );
};
