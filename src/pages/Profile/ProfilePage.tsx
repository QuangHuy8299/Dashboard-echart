import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchProfile } from '@/features/profile/profile.slice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { usePermissions } from '@/hooks/usePermissions';
import GeneralTab from './tabs/GeneralTab';
import SecurityTab from './tabs/SecurityTab';
import PreferencesTab from './tabs/PreferencesTab';
import ActivityTab from './tabs/ActivityTab';
import AdminTab from './tabs/AdminTab';

// Sub-components

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector((state) => state.profile);
  const { canViewAdminLogs } = usePermissions();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (isLoading && !data) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Profile & Settings
        </h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          {canViewAdminLogs && (
            <TabsTrigger value="admin">Admin Controls</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <GeneralTab profile={data} />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <PreferencesTab />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ActivityTab />
        </TabsContent>

        {canViewAdminLogs && (
          <TabsContent value="admin" className="space-y-4">
            <AdminTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfilePage;
