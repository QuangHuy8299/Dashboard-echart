import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Badge from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, ShieldAlert, FileText, Lock } from 'lucide-react';

const AdminTab: React.FC = () => {
  const { role, canManageUsers, canEditSystemSettings } = usePermissions();
  const isAdmin = role === 'admin';

  return (
    <div className="space-y-6">
      {/* Role Verification Section */}
      <Card className={isAdmin ? 'border-primary/50 bg-primary/5' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Admin Console
            </div>
            <Badge
              variant={isAdmin ? 'default' : 'destructive'}
              className="text-base px-4 py-1"
            >
              {isAdmin ? 'Admin Access Granted' : 'Restricted Access'}
            </Badge>
          </CardTitle>
          <CardDescription>
            Role Status:{' '}
            <span className="font-semibold text-foreground uppercase">
              {role}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isAdmin ? (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Insufficient Permissions</AlertTitle>
              <AlertDescription>
                You do not have the required permissions to view sensitive
                administrative data.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-background flex flex-col gap-2">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4" /> RBAC Policy
                </span>
                <span className="font-medium">Strict Mode Enabled</span>
              </div>
              <div className="p-4 border rounded-lg bg-background flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  User Management
                </span>
                <Badge
                  variant={canManageUsers ? 'outline' : 'secondary'}
                  className="w-fit"
                >
                  {canManageUsers ? 'Full Control' : 'Read Only'}
                </Badge>
              </div>
              <div className="p-4 border rounded-lg bg-background flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  System Config
                </span>
                <Badge
                  variant={canEditSystemSettings ? 'outline' : 'secondary'}
                  className="w-fit"
                >
                  {canEditSystemSettings ? 'Write Access' : 'Read Only'}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admin Logs Table - Only rendered if Admin */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              System Audit Logs
            </CardTitle>
            <CardDescription>
              Recent administrative actions recorded by the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admin User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Mock Data for Admin Logs */}
                <TableRow>
                  <TableCell className="font-medium">
                    admin@enterprise.com
                  </TableCell>
                  <TableCell>Updated Global Settings</TableCell>
                  <TableCell>
                    <Badge variant="outline">Config</Badge>
                  </TableCell>
                  <TableCell className="text-right">2 mins ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    admin@enterprise.com
                  </TableCell>
                  <TableCell>Deleted User (ID: u-99)</TableCell>
                  <TableCell>
                    <Badge variant="outline">Users</Badge>
                  </TableCell>
                  <TableCell className="text-right">1 hour ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">system_cron</TableCell>
                  <TableCell>Backup Completed</TableCell>
                  <TableCell>
                    <Badge variant="outline">Database</Badge>
                  </TableCell>
                  <TableCell className="text-right">5 hours ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminTab;
