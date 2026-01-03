export interface LineChartData {
  labels: string[];
  values: number[];
}

export interface PieChartItem {
  name: string;
  value: number;
}

export interface DashboardData {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  lineChartData: LineChartData;
  pieChartData: PieChartItem[];
}

export type Theme = 'dark' | 'light' | 'system';

export interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  theme: Theme;
}
