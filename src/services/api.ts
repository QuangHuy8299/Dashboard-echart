import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Analytics', 'Overview', 'Profile', 'Notifications'],
  keepUnusedDataFor: 60,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: () => ({}),
});
