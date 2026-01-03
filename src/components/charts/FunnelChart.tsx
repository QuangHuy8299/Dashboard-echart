import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { ConversionFunnel } from '@/features/analytics/analytics.types';
import type { EChartsOption } from 'echarts';
import ChartWrapper from './ChartWrapper';

interface FunnelChartProps {
  data: ConversionFunnel[];
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        name: 'Conversion Funnel',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}: {c}',
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 16,
          },
        },
        data: data.map((item) => ({
          value: item.count,
          name: item.stage,
        })),
      },
    ],
    color: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
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
