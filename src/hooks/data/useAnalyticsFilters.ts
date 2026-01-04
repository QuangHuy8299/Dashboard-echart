import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  setDateRange,
  clearDateRange,
  setSelectedRegion,
  setSelectedCategory,
  setSelectedSegment,
  setSorting,
  resetFilters,
} from '@/features/analytics/analytics.filters';

/**
 * Analytics Filters Hook
 * - Provides access to and mutation of analytics filter state
 * - Automatically triggers refetching of affected queries
 * - Ensures efficient updates (only related queries refetch)
 */
export function useAnalyticsFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.analyticsFilters);

  const handleSetDateRange = useCallback(
    (start: string, end: string) => {
      dispatch(setDateRange({ start, end }));
    },
    [dispatch]
  );

  const handleClearDateRange = useCallback(() => {
    dispatch(clearDateRange());
  }, [dispatch]);

  const handleSetRegion = useCallback(
    (region: string | null) => {
      dispatch(setSelectedRegion(region));
    },
    [dispatch]
  );

  const handleSetCategory = useCallback(
    (category: string | null) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  const handleSetSegment = useCallback(
    (segment: string | null) => {
      dispatch(setSelectedSegment(segment));
    },
    [dispatch]
  );

  const handleSetSorting = useCallback(
    (sortBy: 'revenue' | 'orders' | 'growth', sortOrder: 'asc' | 'desc') => {
      dispatch(setSorting({ sortBy, sortOrder }));
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return {
    filters,
    setDateRange: handleSetDateRange,
    clearDateRange: handleClearDateRange,
    setRegion: handleSetRegion,
    setCategory: handleSetCategory,
    setSegment: handleSetSegment,
    setSorting: handleSetSorting,
    reset: handleReset,
  };
}
