import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  BarChart,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  CreditCard,
} from 'lucide-react';
import Button from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { ModeToggle } from '@/components/widgets/ModeToggle';
import { Notifications } from '@/components/widgets/Notifications';
import TopbarAvatar from '@/components/widgets/TopbarAvatar';
import { useAppDispatch } from '@/store/hook';
import { logout } from '@/features/auth/authSlice';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

const searchData = [
  {
    heading: 'Platform',
    items: [
      { title: 'Overview', url: '/', icon: LayoutDashboard },
      { title: 'Analytics', url: '/analytics', icon: BarChart },
    ],
  },
  {
    heading: 'Management',
    items: [
      { title: 'Customers', url: '/customers', icon: Users },
      { title: 'Products', url: '/products', icon: Package },
      { title: 'Orders', url: '/orders', icon: ShoppingCart },
    ],
  },
  {
    heading: 'Finance',
    items: [{ title: 'Invoices', url: '/invoices', icon: FileText }],
  },
  {
    heading: 'Settings',
    items: [
      { title: 'General', url: '/settings', icon: Settings },
      { title: 'Billing', url: '#', icon: CreditCard },
    ],
  },
];

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [isMac] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const titleMap: Record<string, string> = {
    '/': 'Overview',
    '/analytics': 'Analytics',
    '/customers': 'Customers',
    '/products': 'Products',
    '/orders': 'Orders',
    '/invoices': 'Invoices',
    '/settings': 'Settings',
  };
  const path = location.pathname;
  const currentTitle =
    titleMap[path] ?? (path.split('/').filter(Boolean).pop() || 'Overview');
  const formattedTitle = titleMap[path]
    ? currentTitle
    : currentTitle.charAt(0).toUpperCase() + currentTitle.slice(1);

  return (
    <>
      <header className="sticky top-0 z-20 flex h-12 sm:h-14 md:h-16 w-full items-center justify-between border-b bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1 inline-flex" />
          <h1 className="text-sm font-semibold md:hidden">{formattedTitle}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div
              onClick={() => setOpen(true)}
              className="hidden md:flex items-baseline gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              <span>Press</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
              </kbd>
              <span>to search</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />

            <Notifications />

            <div className="h-8 w-[1px] bg-border mx-2" />
            <TopbarAvatar
              name="shadcn"
              email="m@example.com"
              src="/avatars/shadcn.jpg"
              onLogout={() => {
                dispatch(logout());
                navigate('/login');
              }}
            />
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchData.map((group, index) => (
            <React.Fragment key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.url}
                    value={`${item.title} ${group.heading}`}
                    onSelect={() => {
                      runCommand(() => navigate(item.url));
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {index < searchData.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Header;
