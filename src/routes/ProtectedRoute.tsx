import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AUTH_KEY = 'isAuthenticated';

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem(AUTH_KEY) === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
