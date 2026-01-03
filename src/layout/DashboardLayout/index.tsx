import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import { AppSidebar } from './Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const DashboardLayout = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs =
    segments.length === 0
      ? [{ title: 'Overview', path: '/' }]
      : [{ title: 'Overview', path: '/' }].concat(
          segments.map((seg, idx) => ({
            title: seg.charAt(0).toUpperCase() + seg.slice(1),
            path: `/${segments.slice(0, idx + 1).join('/')}`,
          }))
        );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Shared header component */}
        <Header />

        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-zinc-950/50">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb placed inside main content to avoid header overlap */}
            <nav className="mb-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {crumbs.map((c, i) => (
                    <React.Fragment key={c.path}>
                      <BreadcrumbItem>
                        {i !== crumbs.length - 1 ? (
                          <BreadcrumbLink asChild>
                            <Link to={c.path}>{c.title}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{c.title}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {i !== crumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </nav>

            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
