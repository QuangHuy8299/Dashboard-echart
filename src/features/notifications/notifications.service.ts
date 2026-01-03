import type { NotificationItem } from './notifications.types';

// Mock Database
let MOCK_DATA: NotificationItem[] = [
  {
    id: '1',
    title: 'New Order Received',
    description: 'Order #ORD-2024-001 has been placed.',
    time: '2 min ago',
    isRead: false,
    type: 'order',
    createdAt: Date.now() - 120000,
  },
  {
    id: '2',
    title: 'System Update',
    description: 'Maintenance scheduled for 2 AM.',
    time: '1 hour ago',
    isRead: false,
    type: 'system',
    createdAt: Date.now() - 3600000,
  },
  {
    id: '3',
    title: 'New Message',
    description: 'Sarah sent you a message.',
    time: '3 hours ago',
    isRead: true,
    type: 'message',
    createdAt: Date.now() - 10800000,
  },
];

// Helper to generate a random new notification
const generateNewNotification = (): NotificationItem => ({
  id: Date.now().toString(),
  title: 'New Alert',
  description: `System event detected at ${new Date().toLocaleTimeString()}`,
  time: 'Just now',
  isRead: false,
  type: 'system',
  createdAt: Date.now(),
});

export const fetchNotificationsApi = async (): Promise<NotificationItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a 30% chance of receiving a new notification on every poll
      const shouldAdd = Math.random() > 0.7;

      if (shouldAdd) {
        const newItem = generateNewNotification();
        MOCK_DATA = [newItem, ...MOCK_DATA];
      }

      resolve([...MOCK_DATA]);
    }, 800); // 800ms API delay
  });
};

export const markReadApi = async (ids: string[]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_DATA = MOCK_DATA.map((item) =>
        ids.includes('all') || ids.includes(item.id)
          ? { ...item, isRead: true }
          : item
      );
      resolve();
    }, 300);
  });
};
