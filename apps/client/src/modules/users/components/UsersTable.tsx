'use client';

import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/common/Table';
import { Badge } from '@/src/common/Badge';
import { Skeleton } from '@/src/common/Skeleton';
import { User } from '../types';
import { formatDate } from '@/src/utils/format';

interface ProductsTableProps {
  users: User[];
  isLoading?: boolean;
}

const statusVariants: Record<
  User['status'],
  'default' | 'secondary' | 'destructive'
> = {
  active: 'default',
  inactive: 'secondary',
};

const statusLabels: Record<User['status'], string> = {
  active: 'Active',
  inactive: 'Inactive',
};

export function UsersTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function UsersTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm">No users found</p>
    </div>
  );
}

export function UsersTable({ users, isLoading }: ProductsTableProps) {
  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  if (users.length === 0) {
    return <UsersTableEmpty />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <Link
                href={`/app/users/${user.id}`}
                className="hover:text-primary hover:underline"
              >
                {user.firstName} {user.lastName}
              </Link>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={statusVariants[user.status]}>
                {statusLabels[user.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(user.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
