import { auth } from '@/features/auth/auth.utils';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  roles: ('admin' | 'user')[];
}

const RoleGuard: React.FC<Props> = ({ roles }) => {
  const role = auth.getRole();

  if (!role || !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
