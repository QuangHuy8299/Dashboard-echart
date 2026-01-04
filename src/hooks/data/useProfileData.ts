import { useMemo } from 'react';
import {
  useGetUserProfileQuery,
  useGetProfileDetailsQuery,
  useGetPreferencesQuery,
  useGetActivityLogsQuery,
  useGetSessionsQuery,
} from '@/services/profile.api';
import type {
  UserProfile,
  UserPreferences,
  ActivityLog,
  SessionInfo,
} from '@/features/profile/profile.types';

export function useUserProfile(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetUserProfileQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load user profile';
  }, [error]);

  return {
    data: data ?? {
      profile: {} as UserProfile,
      preferences: {} as UserPreferences,
      activities: [] as ActivityLog[],
      sessions: [] as SessionInfo[],
    },
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useProfileDetails(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetProfileDetailsQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load profile details';
  }, [error]);

  return {
    data: data ?? ({} as UserProfile),
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function usePreferences(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetPreferencesQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load preferences';
  }, [error]);

  return {
    data: data ?? ({} as UserPreferences),
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useActivityLogs(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetActivityLogsQuery(
    undefined,
    { skip: options?.skip }
  );

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load activity logs';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useSessions(options?: { skip?: boolean }) {
  const { data, error, isFetching, refetch } = useGetSessionsQuery(undefined, {
    skip: options?.skip,
  });

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return typeof error === 'string' ? error : 'Failed to load sessions';
  }, [error]);

  return {
    data: data ?? [],
    isFetching,
    error: errorMessage,
    refetch,
  };
}

export function useProfileData(options?: { skip?: boolean }) {
  const profileDetails = useProfileDetails(options);
  const preferences = usePreferences(options);
  const activities = useActivityLogs(options);
  const sessions = useSessions(options);

  const isFetching =
    profileDetails.isFetching ||
    preferences.isFetching ||
    activities.isFetching ||
    sessions.isFetching;

  const error =
    profileDetails.error ||
    preferences.error ||
    activities.error ||
    sessions.error;

  const refetch = () => {
    profileDetails.refetch();
    preferences.refetch();
    activities.refetch();
    sessions.refetch();
  };

  return {
    profile: profileDetails.data,
    preferences: preferences.data,
    activities: activities.data,
    sessions: sessions.data,
    isFetching,
    error,
    refetch,
  };
}
