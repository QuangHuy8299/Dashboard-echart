import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'https://api.test.com/',
  }),
  tagTypes: ['Analytics', 'Overview', 'Profile', 'Notifications'],
  // Keep data for a reasonable window to reduce duplicate traffic
  keepUnusedDataFor: 60,
  // Minimize automatic refetches to reduce traffic; override per-query when needed
  refetchOnFocus: false,
  refetchOnReconnect: false,
  // createApi requires an endpoints field even if we inject later
  endpoints: () => ({}),
});
