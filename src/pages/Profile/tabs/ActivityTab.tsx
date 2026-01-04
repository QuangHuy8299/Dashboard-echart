import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import type { ActivityLog } from '@/features/profile/profile.types';

interface Props {
  activities: ActivityLog[] | undefined;
  loading?: boolean;
}

const ActivityTab: React.FC<Props> = ({ activities, loading }) => {
  const activityList = activities || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          You performed {activityList.length} actions in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && activityList.length === 0 ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityList.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.target}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(log.timestamp).toLocaleDateString()}{' '}
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTab;
