// types/dashboard.ts
export interface LineChartData {
  labels: string[];
  values: number[];
}

export interface PieChartData {
  name: string;
  value: number;
}

export interface DashboardData {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  lineChartData: LineChartData;
  pieChartData: PieChartData[];
}
