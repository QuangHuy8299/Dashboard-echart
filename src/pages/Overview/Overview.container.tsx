import React, { useEffect } from 'react';
import {
  selectKPIMetrics,
  selectRevenueData,
  selectCategoryDistribution,
  selectOverviewLoading,
  selectOverviewError,
} from '@/features/overview/overview.selectors';
import { fetchOverviewData } from '@/features/overview/overview.thunks';
import { OverviewView } from './Overview.view';
import { useAppDispatch, useAppSelector } from '@/store/hook';

export const OverviewContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const kpis = useAppSelector(selectKPIMetrics);
  const revenueData = useAppSelector(selectRevenueData);
  const categoryDistribution = useAppSelector(selectCategoryDistribution);
  const loading = useAppSelector(selectOverviewLoading);
  const error = useAppSelector(selectOverviewError);

  useEffect(() => {
    dispatch(fetchOverviewData());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchOverviewData());
  };

  return (
    <OverviewView
      kpis={kpis}
      revenueData={revenueData}
      categoryDistribution={categoryDistribution}
      loading={loading}
      error={error}
      onRetry={handleRetry}
    />
  );
};
