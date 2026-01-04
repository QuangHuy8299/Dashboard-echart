import React from 'react';

interface ChartWrapperProps {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  children,
  className = 'h-64 md:h-80 lg:h-96',
  ...props
}) => {
  return (
    <div
      data-testid={props['data-testid']}
      className={`w-full ${className} rounded-lg bg-card/0 overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default ChartWrapper;
