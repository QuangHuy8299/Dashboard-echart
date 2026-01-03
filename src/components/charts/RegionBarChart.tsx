import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { RegionData } from '@/features/analytics/analytics.types';
import type { EChartsOption } from 'echarts';
import ChartWrapper from './ChartWrapper';

interface RegionBarChartProps {
  data: RegionData[];
}

export const RegionBarChart: React.FC<RegionBarChartProps> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.region),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      name: 'Sales ($)',
      axisLabel: {
        formatter: (value: number) => `$${(value / 1000).toFixed(0)}k`,
      },
    },
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: data.map((item) => item.sales),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#1e40af' },
            ],
          },
        },
      },
    ],
  };

  return (
    <ChartWrapper className="h-60 md:h-72 lg:h-80">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        notMerge={true}
        lazyUpdate={true}
        opts={{ renderer: 'svg' }}
      />
    </ChartWrapper>
  );
};
