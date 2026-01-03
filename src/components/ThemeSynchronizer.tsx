import { useEffect } from 'react';
import { useAppSelector } from '@/store/hook';

export const ThemeSynchronizer = () => {
  const { theme } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const applySystemTheme = () => {
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      };

      applySystemTheme();

      mediaQuery.addEventListener('change', applySystemTheme);

      return () => mediaQuery.removeEventListener('change', applySystemTheme);
    }

    root.classList.add(theme);
  }, [theme]);

  return null;
};
