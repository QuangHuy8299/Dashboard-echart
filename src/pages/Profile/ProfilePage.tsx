import React, { useState } from 'react';
import {
  useProfileDetails,
  useActivityLogs,
  usePreferences,
} from '@/hooks/data/useProfileData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { usePermissions } from '@/hooks/usePermissions';
import GeneralTab from './tabs/GeneralTab';
import SecurityTab from './tabs/SecurityTab';
import PreferencesTab from './tabs/PreferencesTab';
import ActivityTab from './tabs/ActivityTab';
import AdminTab from './tabs/AdminTab';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProfilePage: React.FC = () => {
  const profile = useProfileDetails();
  const activities = useActivityLogs();
  const preferences = usePreferences();
  const { canViewAdminLogs } = usePermissions();

  const [activeTab, setActiveTab] = useState('general');

  const isLoading =
    profile.isFetching || activities.isFetching || preferences.isFetching;

  if (isLoading && !profile.data) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-100 w-full" />
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="block md:hidden w-full">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tab" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="preferences">Preferences</SelectItem>
              <SelectItem value="activity">Activity</SelectItem>
              {canViewAdminLogs && (
                <SelectItem value="admin">Admin Controls</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <TabsList className="hidden md:inline-flex">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          {canViewAdminLogs && (
            <TabsTrigger value="admin">Admin Controls</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <GeneralTab profile={profile.data} />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <PreferencesTab preferences={preferences.data} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ActivityTab
            activities={activities.data}
            loading={activities.isFetching}
          />
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
