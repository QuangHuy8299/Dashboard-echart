import React from 'react';
import {
  useSalesMetrics,
  useSalesTrend,
  useOrdersTrend,
  useRegionData,
  useProductPerformance,
  useCustomerSegments,
  useConversionFunnel,
} from '@/hooks/data/useAnalyticsData';
import { AnalyticsView } from './Analytics.view';

export const AnalyticsContainer: React.FC = () => {
  const salesMetrics = useSalesMetrics();
  const salesTrend = useSalesTrend();
  const ordersTrend = useOrdersTrend();
  const regionData = useRegionData();
  const productPerformance = useProductPerformance();
  const customerSegments = useCustomerSegments();
  const conversionFunnel = useConversionFunnel();

  const isLoading =
    salesMetrics.isFetching || salesTrend.isFetching || ordersTrend.isFetching;

  const error =
    salesMetrics.error ||
    salesTrend.error ||
    ordersTrend.error ||
    regionData.error ||
    productPerformance.error ||
    customerSegments.error ||
    conversionFunnel.error;

  const handleRetry = () => {
    salesMetrics.refetch();
    salesTrend.refetch();
    ordersTrend.refetch();
    regionData.refetch();
    productPerformance.refetch();
    customerSegments.refetch();
    conversionFunnel.refetch();
  };

  return (
    <AnalyticsView
      salesMetrics={salesMetrics.data}
      salesTrend={salesTrend.data}
      ordersTrend={ordersTrend.data}
      regionData={regionData.data}
      productPerformance={productPerformance.data}
      customerSegments={customerSegments.data}
      conversionFunnel={conversionFunnel.data}
      loading={isLoading}
      error={error}
      onRetry={handleRetry}
      metricsLoading={salesMetrics.isFetching}
      trendsLoading={salesTrend.isFetching || ordersTrend.isFetching}
      regionsLoading={regionData.isFetching}
      productsLoading={productPerformance.isFetching}
      segmentsLoading={customerSegments.isFetching}
      funnelLoading={conversionFunnel.isFetching}
    />
  );
};
