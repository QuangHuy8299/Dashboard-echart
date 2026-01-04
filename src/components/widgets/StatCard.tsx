import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const formatCompactNumber = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
}) => {
  const rawValue =
    typeof value === 'string'
      ? parseFloat(value.replace(/[^0-9.-]+/g, ''))
      : value;
  const isLargeNumber = !isNaN(rawValue) && rawValue > 10000;

  const displayValue = isLargeNumber ? formatCompactNumber(rawValue) : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-2xl font-bold truncate cursor-default">
                {displayValue}
              </div>
            </TooltipTrigger>
            {isLargeNumber && (
              <TooltipContent>
                <p>{new Intl.NumberFormat('en-US').format(rawValue)}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        {(description || trendValue) && (
          <p className="text-xs text-muted-foreground mt-1">
            {trendValue && (
              <span
                className={
                  trend === 'up'
                    ? 'text-green-500 mr-1'
                    : trend === 'down'
                    ? 'text-red-500 mr-1'
                    : ''
                }
              >
                {trendValue}
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
