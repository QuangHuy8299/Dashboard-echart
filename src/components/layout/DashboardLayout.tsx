import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
