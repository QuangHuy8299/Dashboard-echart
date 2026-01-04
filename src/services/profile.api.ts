import { baseApi } from './api';
import type {
  UserProfile,
  UserPreferences,
  ActivityLog,
  SessionInfo,
} from '@/features/profile/profile.types';
import {
  mapDummyUserToProfile,
  generateUserPreferences,
  generateActivityLogs,
  generateSessionInfo,
  type DummyUsersResponse,
} from './profile.mappers';

interface ProfileData {
  profile: UserProfile;
  preferences: UserPreferences;
  activities: ActivityLog[];
  sessions: SessionInfo[];
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<ProfileData, void>({
      query: () => '/users?limit=1',
      transformResponse: (response: DummyUsersResponse): ProfileData => {
        const user = response.users[0];
        const profile = mapDummyUserToProfile(user);
        const preferences = generateUserPreferences();
        const activities = generateActivityLogs(user);
        const sessions = generateSessionInfo(user);

        return {
          profile,
          preferences,
          activities,
          sessions,
        };
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Profile', id: 'USER_PROFILE' }],
      keepUnusedDataFor: 300,
    }),

    getProfileDetails: build.query<UserProfile, void>({
      query: () => '/users?limit=1',
      transformResponse: (response: DummyUsersResponse): UserProfile => {
        const user = response.users[0];
        return mapDummyUserToProfile(user);
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Profile', id: 'PROFILE_DETAILS' }],
      keepUnusedDataFor: 300,
    }),

    getPreferences: build.query<UserPreferences, void>({
      query: () => '/users?limit=1',
      transformResponse: (): UserPreferences => {
        return generateUserPreferences();
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Profile', id: 'PREFERENCES' }],
      keepUnusedDataFor: 300,
    }),

    getActivityLogs: build.query<ActivityLog[], void>({
      query: () => '/users?limit=1',
      transformResponse: (response: DummyUsersResponse): ActivityLog[] => {
        const user = response.users[0];
        return generateActivityLogs(user);
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Profile', id: 'ACTIVITY_LOGS' }],
      keepUnusedDataFor: 180,
    }),

    getSessions: build.query<SessionInfo[], void>({
      query: () => '/users?limit=1',
      transformResponse: (response: DummyUsersResponse): SessionInfo[] => {
        const user = response.users[0];
        return generateSessionInfo(user);
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      providesTags: [{ type: 'Profile', id: 'SESSIONS' }],
      keepUnusedDataFor: 180,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserProfileQuery,
  useGetProfileDetailsQuery,
  useGetPreferencesQuery,
  useGetActivityLogsQuery,
  useGetSessionsQuery,
  useLazyGetUserProfileQuery,
  useLazyGetProfileDetailsQuery,
  useLazyGetPreferencesQuery,
  useLazyGetActivityLogsQuery,
  useLazyGetSessionsQuery,
} = profileApi;
