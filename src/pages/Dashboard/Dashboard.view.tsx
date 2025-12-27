import React from 'react';
import StatCard from '@/components/widgets/StatCard';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';

type Props = {
  data: {
    totalUsers: number;
    activeSessions: number;
    revenue: number;
    lineChartData: {
      labels: string[];
      values: number[];
    };
    pieChartData: { name: string; value: number }[];
  };
};

const DashboardView: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={data.totalUsers} />
        <StatCard title="Active Sessions" value={data.activeSessions} />
        <StatCard title="Revenue" value={`$${data.revenue}`} />
      </div>

      <div className="mt-8">
        <LineChart
          labels={data.lineChartData.labels}
          data={data.lineChartData.values}
        />
      </div>

      <div className="mt-8">
        <PieChart data={data.pieChartData} />
      </div>
    </>
  );
};

export default DashboardView;
