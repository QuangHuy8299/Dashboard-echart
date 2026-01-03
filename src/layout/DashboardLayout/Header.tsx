import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useLocation, Link } from 'react-router-dom';
import { ModeToggle } from '@/components/widgets/ModeToggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const location = useLocation();

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
    <header className="sticky top-0 z-20 flex h-12 sm:h-14 md:h-16 w-full items-center justify-between border-b bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        {/* Show the burger/icon trigger on all sizes so users can collapse to icons on small screens */}
        <SidebarTrigger className="-ml-1 inline-flex" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />

            {/* Collapsible breadcrumb when many segments exist */}
            {(() => {
              const segments = path.split('/').filter(Boolean);
              if (segments.length <= 1) {
                return (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbPage>{formattedTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                );
              }

              if (segments.length === 2) {
                return (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={`/${segments[0]}`}>{segments[0]}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{formattedTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                );
              }

              // More than 2 segments -> show first, ellipsis menu, last
              const first = segments[0];
              const middle = segments.slice(1, -1);

              return (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/${first}`}>{first}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />

                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="breadcrumb-ellipsis">…</button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="bottom" align="start">
                        {middle.map((seg) => (
                          <DropdownMenuItem key={seg} asChild>
                            <Link to={`/${first}/${seg}`}>{seg}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{formattedTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              );
            })()}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-muted/50 border-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <div className="h-8 w-[1px] bg-border mx-2" />
          <Button variant="ghost" size="sm" className="gap-2 px-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="hidden sm:inline-block font-medium">Admin</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
