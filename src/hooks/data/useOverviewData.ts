import { useMemo } from 'react';
import {
  useGetKPIMetricsQuery,
  useGetRevenueDataQuery,
  useGetCategoryDistributionQuery,
} from '@/services/overview.api';

export function useKPIMetrics(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetKPIMetricsQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load KPI metrics';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useRevenueData(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetRevenueDataQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load revenue data';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useCategoryDistribution(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetCategoryDistributionQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string'
      ? error
      : 'Failed to load category distribution';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useOverviewData(options?: { skip?: boolean }) {
  const kpiMetrics = useKPIMetrics(options);
  const revenueData = useRevenueData(options);
  const categoryDistribution = useCategoryDistribution(options);

  const isFetching =
    kpiMetrics.isFetching ||
    revenueData.isFetching ||
    categoryDistribution.isFetching;

  const error =
    kpiMetrics.error || revenueData.error || categoryDistribution.error;

  const refetch = () => {
    kpiMetrics.refetch();
    revenueData.refetch();
    categoryDistribution.refetch();
  };

  return {
    kpiMetrics: kpiMetrics.data,
    revenueData: revenueData.data,
    categoryDistribution: categoryDistribution.data,
    isFetching,
    error,
    refetch,
  };
}
