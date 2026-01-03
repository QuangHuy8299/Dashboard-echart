import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import DashboardLayout from '@/layout/DashboardLayout';
import { ROUTES } from './paths';
import AuthGuard from './guards/Authguard';
import RoleGuard from './guards/RoleGuard';
import PublicGuard from './guards/PublicGuard';
import AuthLayout from '@/layout/AuthLayout';
import OverviewPage from '@/pages/Overview';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicGuard />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
      </Route>

      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="analytics" element={<div>Analytics Page</div>} />
          <Route path="customers" element={<div>Customers Page</div>} />
          <Route path="products" element={<div>Products Page</div>} />
          <Route path="orders" element={<div>Orders Page</div>} />
          <Route path="invoices" element={<div>Invoices Page</div>} />

          <Route element={<RoleGuard roles={['user']} />}>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

      <Route
        path={ROUTES.DASHBOARD_ALIAS}
        element={<Navigate to={ROUTES.DASHBOARD} replace />}
      />

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default AppRoutes;
