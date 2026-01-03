import React from 'react';
import { useAppSelector } from '@/store/hook';
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
import { Badge } from '@/components/ui/badge';

const ActivityTab: React.FC = () => {
  const { activities } = useAppSelector((state) => state.profile);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          You performed {activities.length} actions in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            {activities.map((log) => (
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
      </CardContent>
    </Card>
  );
};

export default ActivityTab;
