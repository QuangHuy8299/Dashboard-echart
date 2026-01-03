import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboard.slice';
import { overviewReducer } from '../features/overview/overview.slice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    overview: overviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
