import { baseApi } from './api';
import type {
  KPIMetric,
  RevenueData,
  CategoryDistribution,
} from '@/features/overview/overview.types';
import {
  mapToKPIMetrics,
  generateRevenueData,
  mapProductsToCategoryDistribution,
  type DummyProductsResponse,
  type DummyCartsResponse,
} from './overview.mappers';

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getKPIMetrics: build.query<KPIMetric[], void>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        try {
          const productsResult = await baseQuery('/products?limit=100');
          const cartsResult = await baseQuery('/carts?limit=100');

          if (productsResult.error) {
            return { error: productsResult.error };
          }

          if (cartsResult.error) {
            return { error: cartsResult.error };
          }

          const productsData = productsResult.data as DummyProductsResponse;
          const cartsData = cartsResult.data as DummyCartsResponse;
          const metrics = mapToKPIMetrics(productsData, cartsData);

          return { data: metrics };
        } catch {
          return {
            error: {
              status: 'CUSTOM_ERROR' as const,
              error: 'Failed to fetch KPI metrics',
            },
          };
        }
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Overview', id: 'KPI_METRICS' }],
      keepUnusedDataFor: 300,
    }),

    getRevenueData: build.query<RevenueData[], void>({
      query: () => '/carts?limit=100',
      transformResponse: (response: DummyCartsResponse): RevenueData[] => {
        return generateRevenueData(response);
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Overview', id: 'REVENUE_DATA' }],
      keepUnusedDataFor: 300,
    }),

    getCategoryDistribution: build.query<CategoryDistribution[], void>({
      query: () => '/products?limit=100',
      transformResponse: (
        response: DummyProductsResponse
      ): CategoryDistribution[] => {
        return mapProductsToCategoryDistribution(response);
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Overview', id: 'CATEGORY_DIST' }],
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetKPIMetricsQuery,
  useGetRevenueDataQuery,
  useGetCategoryDistributionQuery,
  useLazyGetKPIMetricsQuery,
  useLazyGetRevenueDataQuery,
  useLazyGetCategoryDistributionQuery,
} = overviewApi;
