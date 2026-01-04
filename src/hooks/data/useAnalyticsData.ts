import { useMemo } from 'react';
import {
  useGetSalesMetricsQuery,
  useGetSalesTrendQuery,
  useGetOrdersTrendQuery,
  useGetRegionDataQuery,
  useGetProductPerformanceQuery,
  useGetCustomerSegmentsQuery,
  useGetConversionFunnelQuery,
  type AnalyticsQueryParams,
} from '@/services/analytics.api';
import { useAppSelector } from '@/store/hook';

export function useSalesMetrics(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetSalesMetricsQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load sales metrics';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useSalesTrend(options?: { skip?: boolean }) {
  const filters = useAppSelector((state) => state.analyticsFilters);

  const params: AnalyticsQueryParams | undefined = useMemo(() => {
    if (!filters.dateRangeStart || !filters.dateRangeEnd) return undefined;
    return {
      dateRangeStart: filters.dateRangeStart,
      dateRangeEnd: filters.dateRangeEnd,
    };
  }, [filters.dateRangeStart, filters.dateRangeEnd]);

  const { data, error, isFetching, refetch } = useGetSalesTrendQuery(params, {
    skip: options?.skip,
  });

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load sales trend';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useOrdersTrend(options?: { skip?: boolean }) {
  const filters = useAppSelector((state) => state.analyticsFilters);

  const params: AnalyticsQueryParams | undefined = useMemo(() => {
    if (!filters.dateRangeStart || !filters.dateRangeEnd) return undefined;
    return {
      dateRangeStart: filters.dateRangeStart,
      dateRangeEnd: filters.dateRangeEnd,
    };
  }, [filters.dateRangeStart, filters.dateRangeEnd]);

  const { data, error, isFetching, refetch } = useGetOrdersTrendQuery(params, {
    skip: options?.skip,
  });

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load orders trend';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useRegionData(options?: { skip?: boolean }) {
  const filters = useAppSelector((state) => state.analyticsFilters);

  const params: AnalyticsQueryParams | undefined = useMemo(() => {
    if (!filters.selectedRegion) return undefined;
    return {
      region: filters.selectedRegion,
    };
  }, [filters.selectedRegion]);

  const { data, error, isFetching, refetch } = useGetRegionDataQuery(params, {
    skip: options?.skip,
  });

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load region data';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useProductPerformance(options?: { skip?: boolean }) {
  const filters = useAppSelector((state) => state.analyticsFilters);

  const params: AnalyticsQueryParams | undefined = useMemo(() => {
    if (!filters.selectedCategory) return undefined;
    return {
      category: filters.selectedCategory,
    };
  }, [filters.selectedCategory]);

  const {
    data: rawData,
    error,
    isFetching,
    refetch,
  } = useGetProductPerformanceQuery(params, {
    skip: options?.skip,
  });

  const data = useMemo(() => {
    if (!rawData) return [];
    const sorted = [...rawData].sort((a, b) => {
      let aVal: number;
      let bVal: number;

      switch (filters.sortBy) {
        case 'orders':
          aVal = a.units;
          bVal = b.units;
          break;
        case 'growth':
          aVal = a.trend === 'up' ? 1 : a.trend === 'down' ? -1 : 0;
          bVal = b.trend === 'up' ? 1 : b.trend === 'down' ? -1 : 0;
          break;
        case 'revenue':
        default:
          aVal = a.revenue;
          bVal = b.revenue;
      }

      return filters.sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });
    return sorted;
  }, [rawData, filters.sortBy, filters.sortOrder]);

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string'
      ? error
      : 'Failed to load product performance';
  }, [error]);

  return {
    data,
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useCustomerSegments(options?: { skip?: boolean }) {
  const filters = useAppSelector((state) => state.analyticsFilters);

  const params: AnalyticsQueryParams | undefined = useMemo(() => {
    if (!filters.selectedSegment) return undefined;
    return {
      segment: filters.selectedSegment,
    };
  }, [filters.selectedSegment]);

  const { data, error, isFetching, refetch } = useGetCustomerSegmentsQuery(
    params,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string'
      ? error
      : 'Failed to load customer segments';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useConversionFunnel(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetConversionFunnelQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string'
      ? error
      : 'Failed to load conversion funnel';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useAnalytics(options?: { skip?: boolean }) {
  const salesMetrics = useSalesMetrics(options);
  const salesTrend = useSalesTrend(options);
  const ordersTrend = useOrdersTrend(options);
  const regionData = useRegionData(options);
  const productPerformance = useProductPerformance(options);
  const customerSegments = useCustomerSegments(options);
  const conversionFunnel = useConversionFunnel(options);

  const isFetching =
    salesMetrics.isFetching ||
    salesTrend.isFetching ||
    ordersTrend.isFetching ||
    regionData.isFetching ||
    productPerformance.isFetching ||
    customerSegments.isFetching ||
    conversionFunnel.isFetching;

  const error =
    salesMetrics.error ||
    salesTrend.error ||
    ordersTrend.error ||
    regionData.error ||
    productPerformance.error ||
    customerSegments.error ||
    conversionFunnel.error;

  const refetch = () => {
    salesMetrics.refetch();
    salesTrend.refetch();
    ordersTrend.refetch();
    regionData.refetch();
    productPerformance.refetch();
    customerSegments.refetch();
    conversionFunnel.refetch();
  };

  return {
    salesMetrics: salesMetrics.data,
    salesTrend: salesTrend.data,
    ordersTrend: ordersTrend.data,
    regionData: regionData.data,
    productPerformance: productPerformance.data,
    customerSegments: customerSegments.data,
    conversionFunnel: conversionFunnel.data,
    isFetching,
    error,
    refetch,
  };
}
