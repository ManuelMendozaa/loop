'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';

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
import { Provider, PROVIDER_TYPE_LABELS } from '../types';

interface ProvidersTableProps {
  providers: Provider[];
  isLoading?: boolean;
}

const statusVariants: Record<
  Provider['status'],
  'default' | 'secondary' | 'destructive'
> = {
  active: 'default',
  inactive: 'destructive',
  pending: 'secondary',
};

const statusLabels: Record<Provider['status'], string> = {
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

function RatingDisplay({ rating }: { rating?: number }) {
  if (rating === undefined) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}

function ProvidersTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Ingredients</TableHead>
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
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12" />
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

function ProvidersTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm">No providers found</p>
    </div>
  );
}

function ProvidersTable({ providers, isLoading }: ProvidersTableProps) {
  if (isLoading) {
    return <ProvidersTableSkeleton />;
  }

  if (providers.length === 0) {
    return <ProvidersTableEmpty />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Ingredients</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {providers.map((provider) => (
          <TableRow key={provider.id}>
            <TableCell className="font-medium">
              <Link
                href={`/app/providers/${provider.id}`}
                className="hover:text-primary hover:underline"
              >
                {provider.name}
              </Link>
            </TableCell>
            <TableCell>{PROVIDER_TYPE_LABELS[provider.type]}</TableCell>
            <TableCell>
              {provider.city && provider.country
                ? `${provider.city}, ${provider.country}`
                : provider.country || '—'}
            </TableCell>
            <TableCell>
              <RatingDisplay rating={provider.rating} />
            </TableCell>
            <TableCell>{provider.ingredientsCount}</TableCell>
            <TableCell>
              <Badge variant={statusVariants[provider.status]}>
                {statusLabels[provider.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(provider.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ProvidersTable, ProvidersTableSkeleton, ProvidersTableEmpty };
export type { ProvidersTableProps };
