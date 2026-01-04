import type {
  SalesMetric,
  TimeSeriesPoint,
  RegionData,
  ProductPerformance,
  CustomerSegment,
  ConversionFunnel,
} from '@/features/analytics/analytics.types';

export interface DummyProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
}

export interface DummyCartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
}

export interface DummyCart {
  id: number;
  products: DummyCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
    title: string;
  };
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyCartsResponse {
  carts: DummyCart[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyUsersResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

export function mapProductsToSalesMetrics(
  productsResponse: DummyProductsResponse
): SalesMetric[] {
  const products = productsResponse.products;

  if (products.length === 0) {
    return [];
  }

  const totalRevenue = products.reduce(
    (sum, p) => sum + p.price * (1 - p.discountPercentage / 100),
    0
  );
  const avgPrice =
    products.reduce((sum, p) => sum + p.price, 0) / products.length;
  const avgDiscount =
    products.reduce((sum, p) => sum + p.discountPercentage, 0) /
    products.length;
  const avgRating =
    products.reduce((sum, p) => sum + p.rating, 0) / products.length;

  return [
    {
      id: 'total-revenue',
      label: 'Total Revenue',
      currentValue: Math.round(totalRevenue),
      previousValue: Math.round(totalRevenue * 0.85),
      change: 17.6,
      changeType: 'increase',
      format: 'currency',
    },
    {
      id: 'avg-price',
      label: 'Avg Product Price',
      currentValue: Math.round(avgPrice),
      previousValue: Math.round(avgPrice * 0.92),
      change: 8.7,
      changeType: 'increase',
      format: 'currency',
    },
    {
      id: 'avg-discount',
      label: 'Avg Discount Rate',
      currentValue: Math.round(avgDiscount * 10) / 10,
      previousValue: Math.round(avgDiscount * 0.95 * 10) / 10,
      change: 5.3,
      changeType: 'increase',
      format: 'percentage',
    },
    {
      id: 'avg-rating',
      label: 'Avg Product Rating',
      currentValue: Math.round(avgRating * 10) / 10,
      previousValue: Math.round(avgRating * 0.95 * 10) / 10,
      change: 5.1,
      changeType: 'increase',
      format: 'number',
    },
  ];
}

export function generateSalesTrend(
  cartsResponse: DummyCartsResponse,
  dayCount: number = 7
): TimeSeriesPoint[] {
  const baselineRevenue =
    cartsResponse.carts.reduce((sum, c) => sum + c.discountedTotal, 0) /
    cartsResponse.carts.length;

  const trends: TimeSeriesPoint[] = [];
  const today = new Date();

  for (let i = dayCount - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const variance = (Math.sin(i * 0.5) + Math.random() - 0.5) * 0.3;
    const value = Math.round(baselineRevenue * (1 + variance));

    trends.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(value, 0),
    });
  }

  return trends;
}

export function generateOrdersTrend(
  cartsResponse: DummyCartsResponse,
  dayCount: number = 7
): TimeSeriesPoint[] {
  const avgOrderCount = cartsResponse.carts.length / 7;
  const trends: TimeSeriesPoint[] = [];
  const today = new Date();

  for (let i = dayCount - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const variance = (Math.sin(i * 0.7) + Math.random() - 0.5) * 0.25;
    const value = Math.round(avgOrderCount * (1 + variance));

    trends.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(value, 1),
    });
  }

  return trends;
}

export function mapProductsToRegionData(
  productsResponse: DummyProductsResponse
): RegionData[] {
  const regionMap = new Map<
    string,
    { sales: number; orders: number; products: number }
  >();

  for (const product of productsResponse.products) {
    const region = product.category;
    const existing = regionMap.get(region) || {
      sales: 0,
      orders: 0,
      products: 0,
    };

    const revenue = product.price * (1 - product.discountPercentage / 100);
    existing.sales += revenue;
    existing.orders += 1;
    existing.products += 1;

    regionMap.set(region, existing);
  }

  return Array.from(regionMap.entries()).map(([region, data]) => ({
    region,
    sales: Math.round(data.sales),
    orders: data.orders,
    growth: Math.round((Math.random() * 40 - 10) * 10) / 10,
  }));
}

export function mapProductsToProductPerformance(
  productsResponse: DummyProductsResponse
): ProductPerformance[] {
  return productsResponse.products.slice(0, 10).map((product) => {
    const revenue = product.price * (1 - product.discountPercentage / 100);
    const trend: 'up' | 'down' | 'stable' =
      product.rating >= 4 ? 'up' : product.rating <= 2.5 ? 'down' : 'stable';

    return {
      id: `product-${product.id}`,
      name: product.title,
      category: product.category,
      sales: Math.round(revenue * 100),
      units: Math.floor(Math.random() * 100) + 10,
      revenue: Math.round(revenue * 1000),
      trend,
    };
  });
}

export function mapUsersToCustomerSegments(
  usersResponse: DummyUsersResponse
): CustomerSegment[] {
  const totalUsers = usersResponse.total;
  const segments: CustomerSegment[] = [
    {
      segment: 'Premium',
      count: Math.floor(totalUsers * 0.15),
      revenue: Math.floor(Math.random() * 50000) + 100000,
      averageOrderValue: Math.round(Math.random() * 200) + 300,
      percentage: 15,
    },
    {
      segment: 'Regular',
      count: Math.floor(totalUsers * 0.45),
      revenue: Math.floor(Math.random() * 50000) + 80000,
      averageOrderValue: Math.round(Math.random() * 150) + 100,
      percentage: 45,
    },
    {
      segment: 'Occasional',
      count: Math.floor(totalUsers * 0.25),
      revenue: Math.floor(Math.random() * 30000) + 40000,
      averageOrderValue: Math.round(Math.random() * 80) + 40,
      percentage: 25,
    },
    {
      segment: 'New',
      count: Math.floor(totalUsers * 0.15),
      revenue: Math.floor(Math.random() * 20000) + 20000,
      averageOrderValue: Math.round(Math.random() * 60) + 30,
      percentage: 15,
    },
  ];

  return segments;
}

export function generateConversionFunnel(
  usersResponse: DummyUsersResponse,
  cartsResponse: DummyCartsResponse
): ConversionFunnel[] {
  const totalUsers = usersResponse.total;
  const totalCarts = cartsResponse.total;

  const visitors = totalUsers * 10;
  const browsersForCarts = Math.round(visitors * 0.35);
  const addedToCart = Math.round(browsersForCarts * 0.4);
  const completed = totalCarts;

  return [
    {
      stage: 'Visitors',
      count: visitors,
      percentage: 100,
    },
    {
      stage: 'Browse Products',
      count: browsersForCarts,
      percentage: Math.round((browsersForCarts / visitors) * 100 * 10) / 10,
    },
    {
      stage: 'Add to Cart',
      count: addedToCart,
      percentage: Math.round((addedToCart / visitors) * 100 * 10) / 10,
    },
    {
      stage: 'Completed Purchase',
      count: completed,
      percentage: Math.round((completed / visitors) * 100 * 10) / 10,
    },
  ];
}
