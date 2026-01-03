import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  CheckCheck,
  MessageSquare,
  ShoppingCart,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Button from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Redux
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
} from '@/features/notifications/notifications.slice';
import type { NotificationItem } from '@/features/notifications/notifications.types';

const ITEMS_PER_PAGE = 3;

export const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, unreadCount, isLoading } = useAppSelector(
    (state) => state.notifications
  );

  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Ref to track previous count for toast logic
  const prevUnreadCountRef = useRef(unreadCount);

  // 1. Initial Fetch & Polling Optimization
  useEffect(() => {
    // Initial fetch
    dispatch(fetchNotifications());

    // Poll every 2 minutes (120000 ms)
    const intervalId = setInterval(() => {
      dispatch(fetchNotifications());
    }, 120000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  // 2. Toast Notification Logic
  useEffect(() => {
    // If unread count increases, it means a new notification arrived
    if (unreadCount > prevUnreadCountRef.current) {
      toast.info('New Notification', {
        description: 'You have received a new update.',
        action: {
          label: 'View',
          onClick: () => setOpen(true),
        },
      });
    }
    prevUnreadCountRef.current = unreadCount;
  }, [unreadCount]);

  const hasMore = visibleCount < items.length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-yellow-500" />;
      case 'system':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />

          {/* Badge: Shows count if > 0 */}
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-in zoom-in ring-2 ring-background">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        {/* Header with Read All */}
        <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">Notifications</h4>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {unreadCount} New
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-primary"
              title="Mark all as read"
              onClick={() => dispatch(markAllAsRead())}
            >
              <CheckCheck className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* List: Fixed height to fit approx 3 items */}
        <ScrollArea className="h-[260px]">
          {isLoading && items.length === 0 ? (
            <div className="flex h-full items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 opacity-20" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 p-1">
              {items.slice(0, visibleCount).map((item) => (
                <button
                  key={item.id}
                  onClick={() => dispatch(markAsRead(item.id))}
                  className={cn(
                    'relative flex w-full items-start gap-3 rounded-md p-3 text-left text-sm transition-all hover:bg-muted/50 group',
                    !item.isRead && 'bg-muted/20'
                  )}
                >
                  <div
                    className={cn(
                      'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm'
                    )}
                  >
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          'font-medium leading-none',
                          !item.isRead && 'text-foreground font-semibold'
                        )}
                      >
                        {item.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {!item.isRead && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-background" />
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer: Load More */}
        {hasMore && (
          <div className="border-t bg-muted/20 p-1">
            <Button
              variant="ghost"
              className="w-full h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
              onClick={handleLoadMore}
            >
              Load more
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
