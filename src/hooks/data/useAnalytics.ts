import { useGetAnalyticsQuery } from '@/services/analytics.api';
import { useMemo } from 'react';

export function useAnalytics(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetAnalyticsQuery(undefined, {
    skip: options?.skip,
  });

  const salesMetrics = useMemo(
    () => data?.salesMetrics ?? [],
    [data?.salesMetrics]
  );
  const salesTrend = useMemo(() => data?.salesTrend ?? [], [data?.salesTrend]);
  const ordersTrend = useMemo(
    () => data?.ordersTrend ?? [],
    [data?.ordersTrend]
  );
  const regionData = useMemo(() => data?.regionData ?? [], [data?.regionData]);
  const productPerformance = useMemo(
    () => data?.productPerformance ?? [],
    [data?.productPerformance]
  );
  const customerSegments = useMemo(
    () => data?.customerSegments ?? [],
    [data?.customerSegments]
  );
  const conversionFunnel = useMemo(
    () => data?.conversionFunnel ?? [],
    [data?.conversionFunnel]
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load analytics';
  }, [error]);

  return {
    salesMetrics,
    salesTrend,
    ordersTrend,
    regionData,
    productPerformance,
    customerSegments,
    conversionFunnel,
    isFetching,
    error: errorMessage,
    refetch,
  };
}
