import type {
  KPIMetric,
  RevenueData,
  CategoryDistribution,
} from '@/features/overview/overview.types';

export interface DummyProductsResponse {
  products: Array<{
    id: number;
    title: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
  }>;
  total: number;
}

export interface DummyCartsResponse {
  carts: Array<{
    id: number;
    products: Array<{
      id: number;
      quantity: number;
      discountedTotal: number;
    }>;
    total: number;
    discountedTotal: number;
    userId: number;
    totalQuantity: number;
  }>;
  total: number;
}

export function mapToKPIMetrics(
  productsResponse: DummyProductsResponse,
  cartsResponse: DummyCartsResponse
): KPIMetric[] {
  const products = productsResponse.products;
  const carts = cartsResponse.carts;

  if (products.length === 0 || carts.length === 0) {
    return [];
  }

  const totalRevenue = carts.reduce(
    (sum, cart) => sum + cart.discountedTotal,
    0
  );
  const totalOrders = carts.length;
  const avgOrderValue = totalRevenue / totalOrders;
  const avgRating =
    products.reduce((sum, p) => sum + p.rating, 0) / products.length;

  return [
    {
      id: 'total-revenue',
      label: 'Total Revenue',
      value: Math.round(totalRevenue),
      change: 12.5,
      changeType: 'increase',
      icon: 'DollarSign',
      format: 'currency',
    },
    {
      id: 'total-orders',
      label: 'Total Orders',
      value: totalOrders,
      change: 8.2,
      changeType: 'increase',
      icon: 'ShoppingCart',
      format: 'number',
    },
    {
      id: 'avg-order-value',
      label: 'Avg Order Value',
      value: Math.round(avgOrderValue * 10) / 10,
      change: 3.8,
      changeType: 'increase',
      icon: 'TrendingUp',
      format: 'currency',
    },
    {
      id: 'avg-rating',
      label: 'Avg Product Rating',
      value: Math.round(avgRating * 10) / 10,
      change: 5.1,
      changeType: 'increase',
      icon: 'Star',
      format: 'number',
    },
  ];
}

export function generateRevenueData(
  cartsResponse: DummyCartsResponse
): RevenueData[] {
  const baselineRevenue =
    cartsResponse.carts.reduce((sum, c) => sum + c.discountedTotal, 0) /
    cartsResponse.carts.length;

  const revenueData: RevenueData[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const seasonality = Math.sin((i / 365) * Math.PI * 2) * 10000;
    const randomVariation = (Math.random() - 0.5) * 5000;
    const trend = (364 - i) * 50;

    const revenue = Math.round(
      baselineRevenue + seasonality + randomVariation + trend
    );
    const orders = Math.round(revenue / 1500);

    revenueData.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.max(revenue, 0),
      orders: Math.max(orders, 1),
    });
  }

  return revenueData;
}

export function mapProductsToCategoryDistribution(
  productsResponse: DummyProductsResponse
): CategoryDistribution[] {
  const categoryMap = new Map<string, number>();

  for (const product of productsResponse.products) {
    const category = product.category;
    const existing = categoryMap.get(category) || 0;
    const value = product.price * (1 - product.discountPercentage / 100);
    categoryMap.set(category, existing + value);
  }

  const total = Array.from(categoryMap.values()).reduce(
    (sum, val) => sum + val,
    0
  );
  const distributions: CategoryDistribution[] = Array.from(
    categoryMap.entries()
  ).map(([category, value]) => ({
    category,
    value: Math.round(value),
    percentage: Math.round((value / total) * 1000) / 10,
  }));

  distributions.sort((a, b) => b.value - a.value);

  return distributions;
}
