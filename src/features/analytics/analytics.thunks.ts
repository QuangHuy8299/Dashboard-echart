import { createAsyncThunk } from '@reduxjs/toolkit';
import { analyticsService } from './analytics.service';

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchAnalyticsData',
  async () => {
    const data = await analyticsService.fetchAnalyticsData();
    return data;
  }
);
