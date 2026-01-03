import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import store from './store';
import { ThemeProvider } from './components/theme-provider';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
