import React from 'react';
// import { useSelector } from 'react-redux';
// import StatCard from '../../components/widgets/StatCard';
// import LineChart from '../../components/charts/LineChart';
// import PieChart from '../../components/charts/PieChart';
// import type { RootState } from '@/store';

const Dashboard: React.FC = () => {
  // const { data, loading, error } = useSelector(
  //   (state: RootState) => state.dashboard
  // );

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;
  // if (!data) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div> */}
    </div>
  );
};

export default Dashboard;
