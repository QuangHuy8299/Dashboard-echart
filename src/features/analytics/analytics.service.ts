import {
  mockSalesMetrics,
  mockSalesTrend,
  mockOrdersTrend,
  mockRegionData,
  mockProductPerformance,
  mockCustomerSegments,
  mockConversionFunnel,
} from './analytics.data';
import type {
  SalesMetric,
  TimeSeriesPoint,
  RegionData,
  ProductPerformance,
  CustomerSegment,
  ConversionFunnel,
} from './analytics.types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyticsService = {
  async fetchSalesMetrics(): Promise<SalesMetric[]> {
    await delay(800);
    return mockSalesMetrics;
  },

  async fetchSalesTrend(): Promise<TimeSeriesPoint[]> {
    await delay(900);
    return mockSalesTrend;
  },

  async fetchOrdersTrend(): Promise<TimeSeriesPoint[]> {
    await delay(850);
    return mockOrdersTrend;
  },

  async fetchRegionData(): Promise<RegionData[]> {
    await delay(750);
    return mockRegionData;
  },

  async fetchProductPerformance(): Promise<ProductPerformance[]> {
    await delay(950);
    return mockProductPerformance;
  },

  async fetchCustomerSegments(): Promise<CustomerSegment[]> {
    await delay(800);
    return mockCustomerSegments;
  },

  async fetchConversionFunnel(): Promise<ConversionFunnel[]> {
    await delay(700);
    return mockConversionFunnel;
  },

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
