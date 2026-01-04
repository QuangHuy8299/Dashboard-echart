import { baseApi } from './api';
import { analyticsService } from '@/services/analytics.service';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Note: We provide a single aggregated `getAnalytics` endpoint for page-level
// loads to reduce total network traffic (one request for multiple widgets).
// Individual widget-level endpoints can be added as lazy queries if needed.

type AnalyticsData = Awaited<
  ReturnType<typeof analyticsService.fetchAnalyticsData>
>;

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnalytics: build.query<AnalyticsData, void>({
      // Use queryFn to reuse the existing mock service (keeps the transition safe)
      async queryFn() {
        try {
          const data = await analyticsService.fetchAnalyticsData();
          return { data };
        } catch (err) {
          const fetchError = {
            status: 'CUSTOM_ERROR',
            data: err instanceof Error ? err.message : String(err),
          } as FetchBaseQueryError;
          return { error: fetchError };
        }
      },
      // No dynamic params for now; serialize minimally to avoid key explosion
      serializeQueryArgs: ({ endpointName }) => `${endpointName}:all`,
      providesTags: (result) =>
        result ? [{ type: 'Analytics', id: 'LIST' }] : [],
      // Keep longer for page-level caches
      keepUnusedDataFor: 120,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAnalyticsQuery, useLazyGetAnalyticsQuery } = analyticsApi;
