import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { TimeSeriesPoint } from '@/features/analytics/analytics.types';

interface SalesTrendChartProps {
  salesData: TimeSeriesPoint[];
  ordersData: TimeSeriesPoint[];
}

export const SalesTrendChart: React.FC<SalesTrendChartProps> = ({
  salesData,
  ordersData,
}) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: ['Sales', 'Orders'],
      bottom: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: salesData.map((item) => item.date),
      axisLabel: {
        formatter: (value: string) => {
          const date = new Date(value);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Sales ($)',
        position: 'left',
        axisLabel: {
          formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
        },
      },
      {
        type: 'value',
        name: 'Orders',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Sales',
        type: 'line',
        smooth: true,
        data: salesData.map((item) => item.value),
        itemStyle: {
          color: '#3b82f6',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
            ],
          },
        },
      },
      {
        name: 'Orders',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: ordersData.map((item) => item.value),
        itemStyle: {
          color: '#10b981',
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
      opts={{ renderer: 'svg' }}
    />
  );
};
