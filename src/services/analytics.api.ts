import { baseApi } from './api';
import type {
  SalesMetric,
  TimeSeriesPoint,
  RegionData,
  ProductPerformance,
  CustomerSegment,
  ConversionFunnel,
} from '@/features/analytics/analytics.types';

export interface AnalyticsQueryParams {
  dateRangeStart?: string;
  dateRangeEnd?: string;
  region?: string;
  category?: string;
  segment?: string;
}

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Sales Metrics - GET /analytics/metrics
    // Returns: KPI numbers (Total Sales, Avg Order Value, Conversion Rate, etc.)
    getSalesMetrics: build.query<SalesMetric[], void>({
      query: () => '/analytics/metrics',
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Analytics', id: 'METRICS' }],
      keepUnusedDataFor: 300, // KPIs are stable - cache for 5 minutes
    }),

    // Sales Trend - GET /analytics/trends/sales?dateStart=...&dateEnd=...
    // Returns: Time series of sales volume
    getSalesTrend: build.query<
      TimeSeriesPoint[],
      AnalyticsQueryParams | undefined
    >({
      query: (params) => {
        const queryString = new URLSearchParams();
        if (params?.dateRangeStart)
          queryString.append('dateStart', params.dateRangeStart);
        if (params?.dateRangeEnd)
          queryString.append('dateEnd', params.dateRangeEnd);
        return `/analytics/trends/sales${
          queryString.toString() ? `?${queryString}` : ''
        }`;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        dateStart: queryArgs?.dateRangeStart,
        dateEnd: queryArgs?.dateRangeEnd,
      }),
      providesTags: [{ type: 'Analytics', id: 'SALES_TREND' }],
      keepUnusedDataFor: 120, // Trends change more frequently - cache for 2 minutes
    }),

    // Orders Trend - GET /analytics/trends/orders?dateStart=...&dateEnd=...
    // Returns: Time series of order volume
    getOrdersTrend: build.query<
      TimeSeriesPoint[],
      AnalyticsQueryParams | undefined
    >({
      query: (params) => {
        const queryString = new URLSearchParams();
        if (params?.dateRangeStart)
          queryString.append('dateStart', params.dateRangeStart);
        if (params?.dateRangeEnd)
          queryString.append('dateEnd', params.dateRangeEnd);
        return `/analytics/trends/orders${
          queryString.toString() ? `?${queryString}` : ''
        }`;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        dateStart: queryArgs?.dateRangeStart,
        dateEnd: queryArgs?.dateRangeEnd,
      }),
      providesTags: [{ type: 'Analytics', id: 'ORDERS_TREND' }],
      keepUnusedDataFor: 120,
    }),

    // Region Data - GET /analytics/regions?region=...
    // Returns: Sales breakdown by geographic region
    getRegionData: build.query<RegionData[], AnalyticsQueryParams | undefined>({
      query: (params) => {
        const queryString = new URLSearchParams();
        if (params?.region) queryString.append('region', params.region);
        return `/analytics/regions${
          queryString.toString() ? `?${queryString}` : ''
        }`;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        region: queryArgs?.region,
      }),
      providesTags: [{ type: 'Analytics', id: 'REGION_DATA' }],
      keepUnusedDataFor: 180, // Weekly changes - cache for 3 minutes
    }),

    // Product Performance - GET /analytics/products?category=...
    // Returns: Product sales metrics, units sold, trends
    getProductPerformance: build.query<
      ProductPerformance[],
      AnalyticsQueryParams | undefined
    >({
      query: (params) => {
        const queryString = new URLSearchParams();
        if (params?.category) queryString.append('category', params.category);
        return `/analytics/products${
          queryString.toString() ? `?${queryString}` : ''
        }`;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        category: queryArgs?.category,
      }),
      providesTags: [{ type: 'Analytics', id: 'PRODUCT_PERF' }],
      keepUnusedDataFor: 180,
    }),

    // Customer Segments - GET /analytics/segments?segment=...
    // Returns: Revenue breakdown by customer type (Premium, Regular, Occasional, New)
    getCustomerSegments: build.query<
      CustomerSegment[],
      AnalyticsQueryParams | undefined
    >({
      query: (params) => {
        const queryString = new URLSearchParams();
        if (params?.segment) queryString.append('segment', params.segment);
        return `/analytics/segments${
          queryString.toString() ? `?${queryString}` : ''
        }`;
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        segment: queryArgs?.segment,
      }),
      providesTags: [{ type: 'Analytics', id: 'SEGMENTS' }],
      keepUnusedDataFor: 180,
    }),

    // Conversion Funnel - GET /analytics/funnel
    // Returns: Visitor-to-purchase conversion stages with counts
    getConversionFunnel: build.query<ConversionFunnel[], void>({
      query: () => '/analytics/funnel',
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Analytics', id: 'FUNNEL' }],
      keepUnusedDataFor: 300, // Stable KPI - cache for 5 minutes
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
