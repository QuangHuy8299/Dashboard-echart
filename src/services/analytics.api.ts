import { baseApi } from './api';
import type {
  SalesMetric,
  TimeSeriesPoint,
  RegionData,
  ProductPerformance,
  CustomerSegment,
  ConversionFunnel,
} from '@/features/analytics/analytics.types';
import {
  mapProductsToSalesMetrics,
  generateSalesTrend,
  generateOrdersTrend,
  mapProductsToRegionData,
  mapProductsToProductPerformance,
  mapUsersToCustomerSegments,
  generateConversionFunnel,
  type DummyProductsResponse,
  type DummyCartsResponse,
  type DummyUsersResponse,
} from './analytics.mappers';

export interface AnalyticsQueryParams {
  dateRangeStart?: string;
  dateRangeEnd?: string;
  region?: string;
  category?: string;
  segment?: string;
}

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSalesMetrics: build.query<SalesMetric[], void>({
      query: () => '/products?limit=100',
      transformResponse: (response: DummyProductsResponse): SalesMetric[] => {
        return mapProductsToSalesMetrics(response);
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Analytics', id: 'METRICS' }],
      keepUnusedDataFor: 300,
    }),

    getSalesTrend: build.query<
      TimeSeriesPoint[],
      AnalyticsQueryParams | undefined
    >({
      query: () => `/carts?limit=100`,
      transformResponse: (response: DummyCartsResponse): TimeSeriesPoint[] => {
        return generateSalesTrend(response);
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        dateStart: queryArgs?.dateRangeStart,
        dateEnd: queryArgs?.dateRangeEnd,
      }),
      providesTags: [{ type: 'Analytics', id: 'SALES_TREND' }],
      keepUnusedDataFor: 120,
    }),

    getOrdersTrend: build.query<
      TimeSeriesPoint[],
      AnalyticsQueryParams | undefined
    >({
      query: () => `/carts?limit=100`,
      transformResponse: (response: DummyCartsResponse): TimeSeriesPoint[] => {
        return generateOrdersTrend(response);
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        dateStart: queryArgs?.dateRangeStart,
        dateEnd: queryArgs?.dateRangeEnd,
      }),
      providesTags: [{ type: 'Analytics', id: 'ORDERS_TREND' }],
      keepUnusedDataFor: 120,
    }),

    getRegionData: build.query<RegionData[], AnalyticsQueryParams | undefined>({
      query: () => `/products?limit=100`,
      transformResponse: (response: DummyProductsResponse): RegionData[] => {
        return mapProductsToRegionData(response);
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        region: queryArgs?.region,
      }),
      providesTags: [{ type: 'Analytics', id: 'REGION_DATA' }],
      keepUnusedDataFor: 180,
    }),

    getProductPerformance: build.query<
      ProductPerformance[],
      AnalyticsQueryParams | undefined
    >({
      query: () => `/products?limit=100`,
      transformResponse: (
        response: DummyProductsResponse
      ): ProductPerformance[] => {
        return mapProductsToProductPerformance(response);
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        category: queryArgs?.category,
      }),
      providesTags: [{ type: 'Analytics', id: 'PRODUCT_PERF' }],
      keepUnusedDataFor: 180,
    }),

    getCustomerSegments: build.query<
      CustomerSegment[],
      AnalyticsQueryParams | undefined
    >({
      query: () => `/users?limit=100`,
      transformResponse: (response: DummyUsersResponse): CustomerSegment[] => {
        return mapUsersToCustomerSegments(response);
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        segment: queryArgs?.segment,
      }),
      providesTags: [{ type: 'Analytics', id: 'SEGMENTS' }],
      keepUnusedDataFor: 180,
    }),

    getConversionFunnel: build.query<ConversionFunnel[], void>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        try {
          const usersResult = await baseQuery('/users?limit=100');
          const cartsResult = await baseQuery('/carts?limit=100');

          if (usersResult.error) {
            return {
              error: usersResult.error,
            };
          }

          if (cartsResult.error) {
            return {
              error: cartsResult.error,
            };
          }

          const usersData = usersResult.data as DummyUsersResponse;
          const cartsData = cartsResult.data as DummyCartsResponse;
          const funnel = generateConversionFunnel(usersData, cartsData);

          return { data: funnel };
        } catch {
          return {
            error: {
              status: 'CUSTOM_ERROR' as const,
              error: 'Failed to fetch conversion funnel data',
            },
          };
        }
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Analytics', id: 'FUNNEL' }],
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSalesMetricsQuery,
  useGetSalesTrendQuery,
  useGetOrdersTrendQuery,
  useGetRegionDataQuery,
  useGetProductPerformanceQuery,
  useGetCustomerSegmentsQuery,
  useGetConversionFunnelQuery,
  useLazyGetSalesMetricsQuery,
  useLazyGetSalesTrendQuery,
  useLazyGetOrdersTrendQuery,
  useLazyGetRegionDataQuery,
  useLazyGetProductPerformanceQuery,
  useLazyGetCustomerSegmentsQuery,
  useLazyGetConversionFunnelQuery,
} = analyticsApi;
