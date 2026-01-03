import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { fetchNotificationsApi, markReadApi } from './notifications.service';
import type {
  NotificationItem,
  NotificationsState,
} from './notifications.types';

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk<NotificationItem[]>(
  'notifications/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNotificationsApi();
      return response;
    } catch {
      // Fixed: Removed unused 'error' variable
      return rejectWithValue('Failed to fetch notifications');
    }
  }
);

export const markAsRead = createAsyncThunk<string, string>(
  'notifications/markRead',
  async (id) => {
    // Fixed: Removed unused '{ dispatch }' parameter
    await markReadApi([id]);
    return id;
  }
);

export const markAllAsRead = createAsyncThunk<void, void>(
  'notifications/markAllRead',
  async () => {
    await markReadApi(['all']);
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        if (state.items.length === 0) state.isLoading = true;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<NotificationItem[]>) => {
          state.isLoading = false;
          state.items = action.payload;
          state.unreadCount = action.payload.filter(
            (item) => !item.isRead
          ).length;
        }
      )
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(markAsRead.fulfilled, (state, action: PayloadAction<string>) => {
        const item = state.items.find((i) => i.id === action.payload);
        if (item && !item.isRead) {
          item.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.items.forEach((item) => {
          item.isRead = true;
        });
        state.unreadCount = 0;
      });
  },
});

export default notificationsSlice.reducer;
