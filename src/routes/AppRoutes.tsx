import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="/dashboard" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
