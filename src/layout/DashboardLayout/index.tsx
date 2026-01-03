import { Outlet } from 'react-router-dom';
import Header from './Header';
import { AppSidebar } from './Sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Shared header component */}
        <Header />

        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-zinc-950/50">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
