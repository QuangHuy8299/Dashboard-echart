import type {
  CategoryDistribution,
  KPIMetric,
  RevenueData,
} from './overview.types';

export const mockRevenueData: RevenueData[] = Array.from(
  { length: 365 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));

    const baseRevenue = 50000;
    const seasonality = Math.sin((i / 365) * Math.PI * 2) * 10000;
    const randomVariation = (Math.random() - 0.5) * 5000;
    const trend = i * 50;

    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.round(baseRevenue + seasonality + randomVariation + trend),
      orders: Math.round(
        (baseRevenue + seasonality + randomVariation + trend) / 150
      ),
    };
  }
);

export const mockKPIMetrics: KPIMetric[] = [
  {
    id: 'total-revenue',
    label: 'Total Revenue',
    value: 2847500,
    change: 12.5,
    changeType: 'increase',
    icon: 'DollarSign',
    format: 'currency',
  },
  {
    id: 'total-orders',
    label: 'Total Orders',
    value: 18542,
    change: 8.2,
    changeType: 'increase',
    icon: 'ShoppingCart',
    format: 'number',
  },
  {
    id: 'avg-order-value',
    label: 'Avg Order Value',
    value: 153.6,
    change: 3.8,
    changeType: 'increase',
    icon: 'TrendingUp',
    format: 'currency',
  },
  {
    id: 'conversion-rate',
    label: 'Conversion Rate',
    value: 3.4,
    change: -0.5,
    changeType: 'decrease',
    icon: 'Target',
    format: 'percentage',
  },
];

export const mockCategoryDistribution: CategoryDistribution[] = [
  { category: 'Electronics', value: 847500, percentage: 35.2 },
  { category: 'Clothing', value: 625300, percentage: 26.0 },
  { category: 'Home & Garden', value: 421800, percentage: 17.5 },
  { category: 'Sports & Outdoors', value: 312400, percentage: 13.0 },
  { category: 'Books & Media', value: 198500, percentage: 8.3 },
];
