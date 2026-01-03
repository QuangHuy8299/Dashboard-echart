import type { UserRole } from '@/features/profile/profile.types';
import { useAppSelector } from '@/store/hook';

export const usePermissions = () => {
  const { data } = useAppSelector((state) => state.profile);
  const role = data?.role || 'user';

  const hasRole = (requiredRoles: UserRole[]) => requiredRoles.includes(role);

  return {
    role,
    canManageUsers: hasRole(['admin']),
    canViewAdminLogs: hasRole(['admin']),
    canEditSystemSettings: hasRole(['admin']),
  };
};
