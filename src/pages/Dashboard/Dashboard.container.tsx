import React from 'react';

import DashboardView from './Dashboard.view';
import { useDashboard } from '@/hooks/useDashboard';

const DashboardContainer: React.FC = () => {
  const { data, loading, error, refetch } = useDashboard();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error}
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return <DashboardView data={data} />;
};

export default DashboardContainer;
