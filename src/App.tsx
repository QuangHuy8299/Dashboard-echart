import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import store from './store';
import { ThemeSynchronizer } from './components/ThemeSynchronizer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeSynchronizer />
      <AppRoutes />
    </Provider>
  );
};

export default App;
