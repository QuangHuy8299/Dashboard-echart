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
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUp,
  TrendingDown,
  Minus,
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
      return <Minus className="h-4 w-4 text-gray-600" />;
  }
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights into your business performance
        </p>
      </div>

      {/* Sales Metrics Cards */}
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
              <Card key={metric.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    {metric.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatValue(metric.currentValue, metric.format)}
                  </div>
                  <div className="flex items-center text-xs mt-1">
                    {metric.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span
                      className={
                        metric.changeType === 'increase'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {Math.abs(metric.change)}%
                    </span>
                    <span className="text-muted-foreground ml-1">
                      vs last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales & Orders Trend</CardTitle>
          <CardDescription>
            90-day trend analysis of sales and order volume
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && salesTrend.length === 0 ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <SalesTrendChart salesData={salesTrend} ordersData={ordersTrend} />
          )}
        </CardContent>
      </Card>

      {/* Region & Funnel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>
              Geographic distribution of sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && regionData.length === 0 ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <RegionBarChart data={regionData} />
            )}
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              Customer journey from visit to purchase
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && conversionFunnel.length === 0 ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <FunnelChart data={conversionFunnel} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Performance Table */}
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Product</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Category
                    </th>
                    <th className="text-right py-3 px-4 font-medium">Units</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Revenue
                    </th>
                    <th className="text-center py-3 px-4 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {productPerformance.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {product.category}
                      </td>
                      <td className="text-right py-3 px-4">
                        {product.units.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {formatValue(product.revenue, 'currency')}
                      </td>
                      <td className="text-center py-3 px-4">
                        {getTrendIcon(product.trend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Segments */}
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
                  className="flex items-center justify-between p-4 border rounded-lg"
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

      {/* Region Details Table */}
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Region</th>
                    <th className="text-right py-3 px-4 font-medium">Sales</th>
                    <th className="text-right py-3 px-4 font-medium">Orders</th>
                    <th className="text-right py-3 px-4 font-medium">
                      Avg Order Value
                    </th>
                    <th className="text-right py-3 px-4 font-medium">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((region) => (
                    <tr key={region.region} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">{region.region}</td>
                      <td className="text-right py-3 px-4">
                        {formatValue(region.sales, 'currency')}
                      </td>
                      <td className="text-right py-3 px-4">
                        {region.orders.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        {formatValue(region.sales / region.orders, 'currency')}
                      </td>
                      <td className="text-right py-3 px-4">
                        <Badge
                          variant={region.growth > 15 ? 'default' : 'secondary'}
                        >
                          {region.growth > 0 ? '+' : ''}
                          {region.growth.toFixed(1)}%
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
