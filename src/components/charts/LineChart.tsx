import React from 'react';
import EChartWrapper from './EChartWrapper';
import type { EChartsOption } from 'echarts';

interface LineChartProps {
  data: number[];
  labels: string[];
}

const LineChart: React.FC<LineChartProps> = ({ data, labels }) => {
  const options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Data',
        type: 'line',
        data: data,
        smooth: true,
      },
    ],
  };

  return <EChartWrapper option={options} />;
};

export default LineChart;
