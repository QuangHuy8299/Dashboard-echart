import { ROUTES } from './paths';

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
  roles?: ('admin' | 'user')[];
  label?: string;
}

export const DASHBOARD_ROUTES: AppRoute[] = [
  {
    path: ROUTES.DASHBOARD,
    element: 'Dashboard',
    protected: true,
    label: 'Dashboard',
  },
  {
    path: ROUTES.SETTINGS,
    element: 'Settings',
    protected: true,
    roles: ['admin'],
    label: 'Settings',
  },
];
