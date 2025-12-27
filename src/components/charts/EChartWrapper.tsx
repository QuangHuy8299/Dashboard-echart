import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartWrapperProps {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
  className?: string;
}

const EChartWrapper: React.FC<EChartWrapperProps> = ({
  option,
  style,
  className,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Init chart once
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    // Set / update option
    chartInstanceRef.current.setOption(option, true);

    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [option]);

  // Dispose on unmount
  useEffect(() => {
    return () => {
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%', ...style }}
      className={className}
    />
  );
};

export default EChartWrapper;
