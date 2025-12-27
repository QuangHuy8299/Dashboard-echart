import {
  selectDashboardData,
  selectDashboardError,
  selectDashboardLoading,
} from '@/features/dashboard/dashboard.selectors';
import { fetchDashboardData } from '@/features/dashboard/dashboard.thunks';
import type { AppDispatch } from '@/store';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector(selectDashboardData);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  const refetch = useCallback(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (!data) {
      dispatch(fetchDashboardData());
    }
  }, [dispatch, data]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
