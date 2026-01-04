import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../services/api';
import dashboardReducer from '../features/dashboard/dashboard.slice';
import { overviewReducer } from '../features/overview/overview.slice';
import notificationsReducer from '@/features/notifications/notifications.slice';
import { analyticsReducer } from '../features/analytics/analytics.slice';
import { profileReducer } from '../features/profile/profile.slice';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    dashboard: dashboardReducer,
    overview: overviewReducer,
    notifications: notificationsReducer,
    analytics: analyticsReducer,
    profile: profileReducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
