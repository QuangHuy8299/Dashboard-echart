export const formatCurrency = (
  value: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};
