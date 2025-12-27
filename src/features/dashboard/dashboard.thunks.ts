import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '../../services/dashboard.service';
import type { DashboardData } from './dashboard.types';

export const fetchDashboardData = createAsyncThunk<DashboardData>(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await dashboardService.getDashboardData();
      return data;
    } catch (error) {
      return rejectWithValue(
        `Critical Error: ${error} Unable to load data from both API and Mock. `
      );
    }
  }
);
