import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const useECharts = (options: echarts.EChartsOption) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // init once
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    chartInstance.current.setOption(options, true);

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [options]);

  return chartRef;
};

export default useECharts;
