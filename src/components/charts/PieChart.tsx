import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PieChartProps {
  data: { name: string; value: number }[];
  title?: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    const option: echarts.EChartsOption = {
      title: {
        text: title ?? 'Pie Chart',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Data',
          type: 'pie',
          radius: '50%',
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    chartInstanceRef.current.setOption(option, true);

    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, title]);

  useEffect(() => {
    return () => {
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: 300 }} />;
};

export default PieChart;
