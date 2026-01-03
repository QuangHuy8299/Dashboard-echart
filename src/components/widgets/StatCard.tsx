import React from 'react';
import { Card } from '@/components/ui/card';

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
    <Card className={`p-3 sm:p-4 flex items-center gap-3 ${className ?? ''}`}>
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="min-w-0">
        <h2 className="text-sm sm:text-base md:text-lg font-semibold truncate">
          {title}
        </h2>
        <p className="text-lg sm:text-2xl md:text-3xl font-bold truncate">
          {value}
        </p>
      </div>
    </Card>
  );
};

export default StatCard;
