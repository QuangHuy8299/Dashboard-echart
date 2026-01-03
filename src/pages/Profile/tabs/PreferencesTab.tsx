import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setTheme } from '@/features/dashboard/dashboard.slice';
import { updatePreferences } from '@/features/profile/profile.slice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Monitor, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const PreferencesTab: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.dashboard);
  const { preferences } = useAppSelector((state) => state.profile);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the dashboard looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              {/* Light Button */}
              <Button
                variant="outline"
                className={cn(
                  'justify-start',
                  theme === 'light' &&
                    'border-primary bg-primary/10 text-primary ring-2 ring-primary/20'
                )}
                onClick={() => dispatch(setTheme('light'))}
              >
                <Sun className="mr-2 h-4 w-4" /> Light
              </Button>

              {/* Dark Button - FIXED */}
              <Button
                variant="outline"
                className={cn(
                  'justify-start',
                  theme === 'dark' &&
                    'border-primary bg-primary/10 text-primary ring-2 ring-primary/20'
                )}
                onClick={() => dispatch(setTheme('dark'))}
              >
                <Moon className="mr-2 h-4 w-4" /> Dark
              </Button>

              {/* System Button - FIXED */}
              <Button
                variant="outline"
                className={cn(
                  'justify-start',
                  theme === 'system' &&
                    'border-primary bg-primary/10 text-primary ring-2 ring-primary/20'
                )}
                onClick={() => dispatch(setTheme('system'))}
              >
                <Monitor className="mr-2 h-4 w-4" /> System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ... Notifications Card (Keep as is) ... */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-notif">Email Notifications</Label>
            <Switch
              id="email-notif"
              checked={preferences.emailNotifications}
              onCheckedChange={(c) =>
                dispatch(updatePreferences({ emailNotifications: c }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesTab;
