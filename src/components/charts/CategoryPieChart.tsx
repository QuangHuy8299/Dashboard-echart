import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { CategoryDistribution } from '@/features/overview/overview.types';
import type { EChartsOption } from 'echarts';
import ChartWrapper from './ChartWrapper';

interface CategoryPieChartProps {
  data: CategoryDistribution[];
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ${c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: data.map((item) => item.category),
    },
    series: [
      {
        name: 'Category Sales',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.category,
        })),
      },
    ],
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  };

  return (
    <ChartWrapper className="h-60 md:h-72 lg:h-96">
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
