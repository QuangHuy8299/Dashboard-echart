import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  className,
}) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 flex items-center ${className}`}
    >
      {icon && <div className="mr-4">{icon}</div>}
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
