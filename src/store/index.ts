import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboard.slice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
