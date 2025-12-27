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

export interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}
