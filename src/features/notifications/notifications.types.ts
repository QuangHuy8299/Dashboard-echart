export type NotificationType = 'order' | 'system' | 'message';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: NotificationType;
  createdAt: number;
}

export interface NotificationsState {
  items: NotificationItem[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}
