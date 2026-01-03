import {
  mockCategoryDistribution,
  mockKPIMetrics,
  mockRevenueData,
} from './overview.data';
import type {
  CategoryDistribution,
  KPIMetric,
  RevenueData,
} from './overview.types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const overviewService = {
  async fetchKPIMetrics(): Promise<KPIMetric[]> {
    await delay(800);
    return mockKPIMetrics;
  },

  async fetchRevenueData(): Promise<RevenueData[]> {
    await delay(1000);
    return mockRevenueData;
  },

  async fetchCategoryDistribution(): Promise<CategoryDistribution[]> {
    await delay(900);
    return mockCategoryDistribution;
  },

  async fetchOverviewData(): Promise<{
    kpis: KPIMetric[];
    revenueData: RevenueData[];
    categoryDistribution: CategoryDistribution[];
  }> {
    await delay(1200);
    return {
      kpis: mockKPIMetrics,
      revenueData: mockRevenueData,
      categoryDistribution: mockCategoryDistribution,
    };
  },
};
