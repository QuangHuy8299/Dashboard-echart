import axios from 'axios';
import { AppConfig } from '../../config/app.config';
import data from '../../mock/data.json';
import type { DashboardData } from '@/types/dashboard';

const apiClient = axios.create({
  baseURL: AppConfig.API_URL,
  timeout: AppConfig.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    if (AppConfig.ENABLE_MOCK) {
      console.info('[Mock Mode] Serving Dashboard Data from local JSON...');
      await sleep(1000);
      return data as DashboardData;
    }

    try {
      const response = await apiClient.get<DashboardData>(
        '/dashboard/overview'
      );
      return response.data;
    } catch (error) {
      console.warn('[API Fail] Fallback to Mock Data due to error:', error);
      return data as DashboardData;
    }
  },
};
