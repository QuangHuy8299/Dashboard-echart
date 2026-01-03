import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { RegionData } from '@/features/analytics/analytics.types';

interface RegionBarChartProps {
  data: RegionData[];
}

interface TooltipParams {
  name: string;
  value: number;
  dataIndex: number;
}

export const RegionBarChart: React.FC<RegionBarChartProps> = ({ data }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: TooltipParams[]) => {
        const item = params[0];
        return `${item.name}<br/>Sales: $${(item.value / 1000).toFixed(
          1
        )}k<br/>Growth: ${data[item.dataIndex].growth}%`;
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
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
      opts={{ renderer: 'svg' }}
    />
  );
};
