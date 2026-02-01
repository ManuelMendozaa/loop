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
import { Merchant } from '../types';

interface MerchantsTableProps {
  merchants: Merchant[];
  isLoading?: boolean;
}

const statusVariants: Record<
  Merchant['status'],
  'default' | 'secondary' | 'destructive'
> = {
  active: 'default',
  inactive: 'destructive',
  pending: 'secondary',
};

const statusLabels: Record<Merchant['status'], string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

function MerchantsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-40" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20" />
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

function MerchantsTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm">No merchants found</p>
    </div>
  );
}

function MerchantsTable({ merchants, isLoading }: MerchantsTableProps) {
  if (isLoading) {
    return <MerchantsTableSkeleton />;
  }

  if (merchants.length === 0) {
    return <MerchantsTableEmpty />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {merchants.map((merchant) => (
          <TableRow key={merchant.id}>
            <TableCell className="font-medium">
              <Link
                href={`/app/merchants/${merchant.id}`}
                className="hover:text-primary hover:underline"
              >
                {merchant.name}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {merchant.email}
            </TableCell>
            <TableCell>
              {merchant.city && merchant.country
                ? `${merchant.city}, ${merchant.country}`
                : merchant.country || '—'}
            </TableCell>
            <TableCell>{merchant.productsCount}</TableCell>
            <TableCell>
              <Badge variant={statusVariants[merchant.status]}>
                {statusLabels[merchant.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(merchant.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { MerchantsTable, MerchantsTableSkeleton, MerchantsTableEmpty };
export type { MerchantsTableProps };
