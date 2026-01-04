import type {
  SalesMetric,
  TimeSeriesPoint,
  RegionData,
  ProductPerformance,
  CustomerSegment,
  ConversionFunnel,
} from './analytics.types';

export const mockSalesTrend: TimeSeriesPoint[] = Array.from(
  { length: 90 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));

    const baseValue = 75000;
    const weeklyPattern = Math.sin((i / 7) * Math.PI * 2) * 8000;
    const monthlyTrend = (i / 90) * 15000;
    const randomVariation = (Math.random() - 0.5) * 6000;

    return {
      date: date.toISOString().split('T')[0],
      value: Math.round(
        baseValue + weeklyPattern + monthlyTrend + randomVariation
      ),
    };
  }
);

export const mockOrdersTrend: TimeSeriesPoint[] = Array.from(
  { length: 90 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));

    const baseValue = 450;
    const weeklyPattern = Math.sin((i / 7) * Math.PI * 2) * 50;
    const monthlyTrend = (i / 90) * 80;
    const randomVariation = (Math.random() - 0.5) * 30;

    return {
      date: date.toISOString().split('T')[0],
      value: Math.round(
        baseValue + weeklyPattern + monthlyTrend + randomVariation
      ),
    };
  }
);

export const mockSalesMetrics: SalesMetric[] = [
  {
    id: 'total-sales',
    label: 'Total Sales',
    currentValue: 6842500,
    previousValue: 5976300,
    change: 14.5,
    changeType: 'increase',
    format: 'currency',
  },
  {
    id: 'avg-order-value',
    label: 'Average Order Value',
    currentValue: 167.8,
    previousValue: 154.2,
    change: 8.8,
    changeType: 'increase',
    format: 'currency',
  },
  {
    id: 'conversion-rate',
    label: 'Conversion Rate',
    currentValue: 4.2,
    previousValue: 3.8,
    change: 10.5,
    changeType: 'increase',
    format: 'percentage',
  },
  {
    id: 'customer-retention',
    label: 'Customer Retention',
    currentValue: 78.5,
    previousValue: 82.1,
    change: -4.4,
    changeType: 'decrease',
    format: 'percentage',
  },
];

export const mockRegionData: RegionData[] = [
  {
    region: 'North America',
    sales: 2847500,
    orders: 18542,
    growth: 12.5,
  },
  {
    region: 'Europe',
    sales: 2184300,
    orders: 14287,
    growth: 18.2,
  },
  {
    region: 'Asia Pacific',
    sales: 1456800,
    orders: 9845,
    growth: 24.7,
  },
  {
    region: 'Latin America',
    sales: 245900,
    orders: 1654,
    growth: 8.3,
  },
  {
    region: 'Middle East & Africa',
    sales: 108000,
    orders: 728,
    growth: 15.6,
  },
];

export const mockProductPerformance: ProductPerformance[] = [
  {
    id: 'prod-001',
    name: 'Wireless Headphones Pro',
    category: 'Electronics',
    sales: 847500,
    units: 3542,
    revenue: 847500,
    trend: 'up',
  },
  {
    id: 'prod-002',
    name: 'Smart Watch Series X',
    category: 'Electronics',
    sales: 685400,
    units: 2287,
    revenue: 685400,
    trend: 'up',
  },
  {
    id: 'prod-003',
    name: 'Yoga Mat Premium',
    category: 'Sports & Outdoors',
    sales: 456800,
    units: 9845,
    revenue: 456800,
    trend: 'stable',
  },
  {
    id: 'prod-004',
    name: 'Office Chair Ergonomic',
    category: 'Home & Garden',
    sales: 421800,
    units: 1654,
    revenue: 421800,
    trend: 'down',
  },
  {
    id: 'prod-005',
    name: 'Running Shoes Elite',
    category: 'Sports & Outdoors',
    sales: 398200,
    units: 3128,
    revenue: 398200,
    trend: 'up',
  },
  {
    id: 'prod-006',
    name: 'Laptop Backpack',
    category: 'Electronics',
    sales: 312400,
    units: 5847,
    revenue: 312400,
    trend: 'stable',
  },
  {
    id: 'prod-007',
    name: 'Portable Charger 20000mAh',
    category: 'Electronics',
    sales: 284900,
    units: 8456,
    revenue: 284900,
    trend: 'up',
  },
  {
    id: 'prod-008',
    name: 'Camping Tent 4-Person',
    category: 'Sports & Outdoors',
    sales: 245800,
    units: 987,
    revenue: 245800,
    trend: 'down',
  },
  {
    id: 'prod-009',
    name: 'Desk Lamp LED',
    category: 'Home & Garden',
    sales: 198500,
    units: 4234,
    revenue: 198500,
    trend: 'stable',
  },
  {
    id: 'prod-010',
    name: 'Water Bottle Insulated',
    category: 'Sports & Outdoors',
    sales: 156700,
    units: 6542,
    revenue: 156700,
    trend: 'up',
  },
];

export const mockCustomerSegments: CustomerSegment[] = [
  {
    segment: 'Premium',
    count: 3542,
    revenue: 2847500,
    averageOrderValue: 245.6,
    percentage: 35.2,
  },
  {
    segment: 'Regular',
    count: 8456,
    revenue: 2184300,
    averageOrderValue: 156.8,
    percentage: 42.5,
  },
  {
    segment: 'Occasional',
    count: 5847,
    revenue: 1456800,
    averageOrderValue: 87.3,
    percentage: 18.3,
  },
  {
    segment: 'New',
    count: 2287,
    revenue: 354000,
    averageOrderValue: 124.5,
    percentage: 4.0,
  },
];

export const mockConversionFunnel: ConversionFunnel[] = [
  {
    stage: 'Visitors',
    count: 145000,
    percentage: 100.0,
  },
  {
    stage: 'Product Views',
    count: 87000,
    percentage: 60.0,
  },
  {
    stage: 'Add to Cart',
    count: 34800,
    percentage: 24.0,
  },
  {
    stage: 'Checkout Started',
    count: 17400,
    percentage: 12.0,
  },
  {
    stage: 'Purchase Completed',
    count: 8700,
    percentage: 6.0,
  },
];
