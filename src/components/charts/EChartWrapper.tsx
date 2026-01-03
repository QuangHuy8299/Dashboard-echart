import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { cn } from '@/lib/utils';

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

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current);
    }

    chartInstanceRef.current.setOption(option, true);

    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    // Trigger a resize after mount to ensure correct sizing
    setTimeout(handleResize, 0);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [option]);

  useEffect(() => {
    return () => {
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', ...style }}
      className={cn(className, 'w-full h-[200px] md:h-[260px] lg:h-[320px]')}
    />
  );
};

export default EChartWrapper;
