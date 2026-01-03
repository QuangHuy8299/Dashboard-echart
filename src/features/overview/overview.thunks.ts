import { createAsyncThunk } from '@reduxjs/toolkit';
import { overviewService } from './overview.service';

export const fetchOverviewData = createAsyncThunk(
  'overview/fetchOverviewData',
  async () => {
    const data = await overviewService.fetchOverviewData();
    return data;
  }
);
