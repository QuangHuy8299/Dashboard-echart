import {
  mockSalesMetrics,
  mockSalesTrend,
  mockOrdersTrend,
  mockRegionData,
  mockProductPerformance,
  mockCustomerSegments,
  mockConversionFunnel,
} from '../features/analytics/analytics.data';
import type {
  SalesMetric,
  TimeSeriesPoint,
  RegionData,
  ProductPerformance,
  CustomerSegment,
  ConversionFunnel,
} from '../features/analytics/analytics.types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyticsService = {
  async fetchAnalyticsData(): Promise<{
    salesMetrics: SalesMetric[];
    salesTrend: TimeSeriesPoint[];
    ordersTrend: TimeSeriesPoint[];
    regionData: RegionData[];
    productPerformance: ProductPerformance[];
    customerSegments: CustomerSegment[];
    conversionFunnel: ConversionFunnel[];
  }> {
    await delay(1500);
    return {
      salesMetrics: mockSalesMetrics,
      salesTrend: mockSalesTrend,
      ordersTrend: mockOrdersTrend,
      regionData: mockRegionData,
      productPerformance: mockProductPerformance,
      customerSegments: mockCustomerSegments,
      conversionFunnel: mockConversionFunnel,
    };
  },
};
