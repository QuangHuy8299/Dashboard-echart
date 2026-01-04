import React from 'react';
import { useAnalytics } from '@/hooks/data/useAnalytics';
import { AnalyticsView } from './Analytics.view';

// Use page-level hook to orchestrate the analytics data. This prevents
// duplicate requests from independent widgets and keeps fetch logic out of
// presentational components.

export const AnalyticsContainer: React.FC = () => {
  const {
    salesMetrics,
    salesTrend,
    ordersTrend,
    regionData,
    productPerformance,
    customerSegments,
    conversionFunnel,
    isFetching,
    error,
    refetch,
  } = useAnalytics();

  const handleRetry = () => refetch();

  return (
    <AnalyticsView
      salesMetrics={salesMetrics}
      salesTrend={salesTrend}
      ordersTrend={ordersTrend}
      regionData={regionData}
      productPerformance={productPerformance}
      customerSegments={customerSegments}
      conversionFunnel={conversionFunnel}
      loading={isFetching}
      error={error}
      onRetry={handleRetry}
    />
  );
};
