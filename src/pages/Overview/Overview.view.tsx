import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Target,
} from 'lucide-react';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import type {
  CategoryDistribution,
  KPIMetric,
  RevenueData,
} from '@/features/overview/overview.types';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OverviewViewProps {
  kpis: KPIMetric[];
  revenueData: RevenueData[];
  categoryDistribution: CategoryDistribution[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Target,
};

const formatValue = (value: number, format: KPIMetric['format']): string => {
  switch (format) {
    case 'currency':
      return `$${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'number':
    default:
      return value.toLocaleString('en-US');
  }
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  kpis,
  revenueData,
  categoryDistribution,
  loading,
  error,
  onRetry,
}) => {
  if (error) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={onRetry}
              className="ml-4 px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-100"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading && kpis.length === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4 rounded" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))
          : kpis.map((kpi) => {
              const Icon = iconMap[kpi.icon] || DollarSign;
              return (
                <Card key={kpi.id}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">
                      {kpi.label}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatValue(kpi.value, kpi.format)}
                    </div>
                    <div className="flex items-center text-xs mt-1">
                      {kpi.changeType === 'increase' ? (
                        <ArrowUpIcon className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span
                        className={
                          kpi.changeType === 'increase'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {Math.abs(kpi.change)}%
                      </span>
                      <span className="text-muted-foreground ml-1">
                        from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Daily revenue and order count over the last year
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && revenueData.length === 0 ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <RevenueChart data={revenueData} />
            )}
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Revenue distribution across product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && categoryDistribution.length === 0 ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <CategoryPieChart data={categoryDistribution} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Table */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
          <CardDescription>
            Detailed breakdown of sales by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && categoryDistribution.length === 0 ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      Category
                    </th>
                    <th className="text-right py-3 px-4 font-medium">
                      Revenue
                    </th>
                    <th className="text-right py-3 px-4 font-medium">
                      Percentage
                    </th>
                    <th className="text-right py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryDistribution.map((category) => (
                    <tr
                      key={category.category}
                      className="border-b last:border-0"
                    >
                      <td className="py-3 px-4 font-medium">
                        {category.category}
                      </td>
                      <td className="text-right py-3 px-4">
                        {formatValue(category.value, 'currency')}
                      </td>
                      <td className="text-right py-3 px-4">
                        {category.percentage}%
                      </td>
                      <td className="text-right py-3 px-4">
                        <Badge
                          variant={
                            category.percentage > 20 ? 'default' : 'secondary'
                          }
                        >
                          {category.percentage > 20 ? 'High' : 'Medium'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
