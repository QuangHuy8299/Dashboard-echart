export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface SalesMetric {
  id: string;
  label: string;
  currentValue: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease';
  format: 'currency' | 'number' | 'percentage';
}

export interface RegionData {
  region: string;
  sales: number;
  orders: number;
  growth: number;
}

export interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  sales: number;
  units: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CustomerSegment {
  segment: string;
  count: number;
  revenue: number;
  averageOrderValue: number;
  percentage: number;
}

export interface ConversionFunnel {
  stage: string;
  count: number;
  percentage: number;
}

export interface AnalyticsState {
  salesMetrics: SalesMetric[];
  salesTrend: TimeSeriesPoint[];
  ordersTrend: TimeSeriesPoint[];
  regionData: RegionData[];
  productPerformance: ProductPerformance[];
  customerSegments: CustomerSegment[];
  conversionFunnel: ConversionFunnel[];
  loading: boolean;
  error: string | null;
}
