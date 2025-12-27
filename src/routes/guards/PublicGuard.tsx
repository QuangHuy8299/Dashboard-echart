import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../paths';
import { auth } from '@/features/auth/auth.utils';

const PublicGuard = () => {
  if (auth.isAuthenticated()) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicGuard;
