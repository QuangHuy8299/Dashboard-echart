import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Badge from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  ShoppingCart,
  Users,
  Activity,
} from 'lucide-react';

import { SalesTrendChart } from '@/components/charts/SalesTrendChart';
import { RegionBarChart } from '@/components/charts/RegionBarChart';
import { FunnelChart } from '@/components/charts/FunnelChart';

import type {
  SalesMetric,
  TimeSeriesPoint,
  RegionData,
  ProductPerformance,
  CustomerSegment,
  ConversionFunnel,
} from '@/features/analytics/analytics.types';
import StatCard from '@/components/widgets/StatCard';

interface AnalyticsViewProps {
  salesMetrics: SalesMetric[];
  salesTrend: TimeSeriesPoint[];
  ordersTrend: TimeSeriesPoint[];
  regionData: RegionData[];
  productPerformance: ProductPerformance[];
  customerSegments: CustomerSegment[];
  conversionFunnel: ConversionFunnel[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const formatValue = (value: number, format: SalesMetric['format']): string => {
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

const getTrendIcon = (trend: ProductPerformance['trend']) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case 'down':
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    case 'stable':
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getMetricIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes('revenue') || l.includes('sales') || l.includes('value'))
    return DollarSign;
  if (l.includes('order')) return ShoppingCart;
  if (l.includes('customer') || l.includes('user') || l.includes('visit'))
    return Users;
  return Activity;
};

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  salesMetrics,
  salesTrend,
  ordersTrend,
  regionData,
  productPerformance,
  customerSegments,
  conversionFunnel,
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
              className="ml-4 px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-100 font-medium text-sm"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights into your business performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading && salesMetrics.length === 0
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
          : salesMetrics.map((metric) => (
              <StatCard
                key={metric.id}
                title={metric.label}
                value={formatValue(metric.currentValue, metric.format)}
                icon={getMetricIcon(metric.label)}
                trend={
                  metric.changeType === 'increase'
                    ? 'up'
                    : metric.changeType === 'decrease'
                    ? 'down'
                    : 'neutral'
                }
                trendValue={`${Math.abs(metric.change)}%`}
                description="vs last period"
              />
            ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales & Orders Trend</CardTitle>
          <CardDescription>
            90-day trend analysis of sales and order volume
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && salesTrend.length === 0 ? (
            <Skeleton className="h-100 w-full" />
          ) : (
            <SalesTrendChart salesData={salesTrend} ordersData={ordersTrend} />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>
              Geographic distribution of sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && regionData.length === 0 ? (
              <Skeleton className="h-100 w-full" />
            ) : (
              <RegionBarChart data={regionData} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              Customer journey from visit to purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && conversionFunnel.length === 0 ? (
              <Skeleton className="h-100 w-full" />
            ) : (
              <FunnelChart data={conversionFunnel} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Products Performance</CardTitle>
          <CardDescription>
            Best performing products by revenue and units sold
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && productPerformance.length === 0 ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-center">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPerformance.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.units.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatValue(product.revenue, 'currency')}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          {getTrendIcon(product.trend)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
          <CardDescription>
            Revenue breakdown by customer segment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && customerSegments.length === 0 ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {customerSegments.map((segment) => (
                <div
                  key={segment.segment}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{segment.segment}</h3>
                      <Badge variant="secondary">
                        {segment.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {segment.count.toLocaleString()} customers •{' '}
                      {formatValue(segment.averageOrderValue, 'currency')} avg
                      order
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">
                      {formatValue(segment.revenue, 'currency')}
                    </div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Performance Details</CardTitle>
          <CardDescription>
            Detailed metrics for each geographic region
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && regionData.length === 0 ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead className="text-right">Sales</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">
                      Avg Order Value
                    </TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regionData.map((region) => (
                    <TableRow key={region.region}>
                      <TableCell className="font-medium">
                        {region.region}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatValue(region.sales, 'currency')}
                      </TableCell>
                      <TableCell className="text-right">
                        {region.orders.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatValue(region.sales / region.orders, 'currency')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={region.growth > 15 ? 'default' : 'secondary'}
                        >
                          {region.growth > 0 ? '+' : ''}
                          {region.growth.toFixed(1)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
