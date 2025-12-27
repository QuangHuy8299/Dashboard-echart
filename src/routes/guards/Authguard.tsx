import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../paths';
import { auth } from '@/features/auth/auth.utils';

const AuthGuard = () => {
  const location = useLocation();

  if (!auth.isAuthenticated()) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AuthGuard;
