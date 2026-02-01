'use client';

import Link from 'next/link';
import { CheckCircle2, Clock, Circle, XCircle, FileEdit } from 'lucide-react';

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
import { Process, ProcessStatus, PROCESS_STATUS_LABELS } from '../types';

interface ProcessesTableProps {
  processes: Process[];
  isLoading?: boolean;
}

const statusVariants: Record<
  ProcessStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  draft: 'outline',
  active: 'secondary',
  in_progress: 'default',
  completed: 'default',
  cancelled: 'destructive',
};

const StatusIcon = ({ status }: { status: ProcessStatus }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="size-3.5" />;
    case 'in_progress':
      return <Clock className="size-3.5" />;
    case 'cancelled':
      return <XCircle className="size-3.5" />;
    case 'draft':
      return <FileEdit className="size-3.5" />;
    default:
      return <Circle className="size-3.5" />;
  }
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

function ProgressBar({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <div className="bg-muted h-2 w-20 overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-muted-foreground text-xs">
        {completed}/{total}
      </span>
    </div>
  );
}

function ProcessesTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-40" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-24" />
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

function ProcessesTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm">No processes found</p>
    </div>
  );
}

function ProcessesTable({ processes, isLoading }: ProcessesTableProps) {
  if (isLoading) {
    return <ProcessesTableSkeleton />;
  }

  if (processes.length === 0) {
    return <ProcessesTableEmpty />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {processes.map((process) => (
          <TableRow key={process.id}>
            <TableCell>
              <Link
                href={`/app/processes/${process.id}`}
                className="hover:text-primary hover:underline"
              >
                <span className="font-medium">{process.name}</span>
              </Link>
              {process.description && (
                <p className="text-muted-foreground mt-0.5 max-w-[250px] truncate text-xs">
                  {process.description}
                </p>
              )}
            </TableCell>
            <TableCell>
              {process.product ? (
                <Link
                  href={`/app/products/${process.productId}`}
                  className="text-muted-foreground hover:text-primary text-sm hover:underline"
                >
                  {process.product.name}
                </Link>
              ) : (
                <span className="text-muted-foreground text-sm">—</span>
              )}
            </TableCell>
            <TableCell>
              <ProgressBar
                completed={process.completedSteps}
                total={process.stepsCount}
              />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {process.assignee || '—'}
            </TableCell>
            <TableCell>
              <Badge
                variant={statusVariants[process.status]}
                className="gap-1"
              >
                <StatusIcon status={process.status} />
                {PROCESS_STATUS_LABELS[process.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(process.updatedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ProcessesTable, ProcessesTableSkeleton, ProcessesTableEmpty };
export type { ProcessesTableProps };
