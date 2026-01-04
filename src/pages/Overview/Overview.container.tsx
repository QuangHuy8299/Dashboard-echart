import React from 'react';
import {
  useKPIMetrics,
  useRevenueData,
  useCategoryDistribution,
} from '@/hooks/data/useOverviewData';
import { OverviewView } from './Overview.view';

export const OverviewContainer: React.FC = () => {
  const kpis = useKPIMetrics();
  const revenueData = useRevenueData();
  const categoryDistribution = useCategoryDistribution();

  const isLoading =
    kpis.isFetching ||
    revenueData.isFetching ||
    categoryDistribution.isFetching;

  const error = kpis.error || revenueData.error || categoryDistribution.error;

  const handleRetry = () => {
    kpis.refetch();
    revenueData.refetch();
    categoryDistribution.refetch();
  };

  return (
    <OverviewView
      kpis={kpis.data}
      revenueData={revenueData.data}
      categoryDistribution={categoryDistribution.data}
      loading={isLoading}
      error={error}
      onRetry={handleRetry}
      kpisLoading={kpis.isFetching}
      trendsLoading={revenueData.isFetching}
      categoriesLoading={categoryDistribution.isFetching}
    />
  );
};
