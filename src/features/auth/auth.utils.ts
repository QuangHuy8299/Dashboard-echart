const AUTH_KEY = 'isAuthenticated';
const ROLE_KEY = 'role';

export const auth = {
  isAuthenticated: () => localStorage.getItem(AUTH_KEY) === 'true',
  getRole: () => localStorage.getItem(ROLE_KEY) as 'admin' | 'user' | null,
};
