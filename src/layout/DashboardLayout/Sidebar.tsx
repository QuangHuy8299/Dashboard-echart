import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Command,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/routes/paths';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
    { label: 'Login', path: ROUTES.LOGIN, icon: LogIn },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r bg-card transition-all duration-300 ease-in-out',
        'h-screen sticky top-0 z-30',
        isCollapsed ? 'w-[70px]' : 'w-64',
        'shadow-xl lg:shadow-none'
      )}
    >
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 h-6 w-6 rounded-full border shadow-sm z-50 bg-background hover:bg-primary hover:text-primary-foreground transition-transform"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div
        className={cn(
          'flex h-16 items-center border-b px-4',
          isCollapsed ? 'justify-center' : 'px-6'
        )}
      >
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Command className="h-6 w-6 text-primary shrink-0" />
          {!isCollapsed && (
            <span className="text-xl tracking-tight transition-opacity duration-300">
              Acme Corp
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-2 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : ''}
              className={cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-secondary text-secondary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-accent-foreground',
                isCollapsed ? 'justify-center' : 'gap-3'
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0',
                  isActive ? 'text-primary' : ''
                )}
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t flex items-center justify-center h-[65px]">
        {!isCollapsed ? (
          <span className="text-xs text-muted-foreground font-medium">
            v1.0.4 Acme Inc.
          </span>
        ) : (
          <span className="text-xs font-bold text-muted-foreground">v1</span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
