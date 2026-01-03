export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  format: 'currency' | 'number' | 'percentage';
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategoryDistribution {
  category: string;
  value: number;
  percentage: number;
}

export interface OverviewState {
  kpis: KPIMetric[];
  revenueData: RevenueData[];
  categoryDistribution: CategoryDistribution[];
  loading: boolean;
  error: string | null;
}
