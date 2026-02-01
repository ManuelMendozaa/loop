'use client';

import Link from 'next/link';
import { Circle, FileEdit, CheckCircle2, Archive } from 'lucide-react';

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
import {
  Process,
  ProcessStatus,
  ProcessPriority,
  PROCESS_STATUS_LABELS,
  PROCESS_PRIORITY_LABELS,
} from '../types';

interface ProcessesTableProps {
  processes: Process[];
  isLoading?: boolean;
}

const statusVariants: Record<
  ProcessStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  draft: 'outline',
  active: 'default',
  archived: 'secondary',
};

const priorityVariants: Record<
  ProcessPriority,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  low: 'outline',
  medium: 'secondary',
  high: 'default',
  urgent: 'destructive',
};

const StatusIcon = ({ status }: { status: ProcessStatus }) => {
  switch (status) {
    case 'active':
      return <CheckCircle2 className="size-3.5" />;
    case 'archived':
      return <Archive className="size-3.5" />;
    case 'draft':
      return <FileEdit className="size-3.5" />;
    default:
      return <Circle className="size-3.5" />;
  }
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

function ProcessesTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Pasos</TableHead>
          <TableHead>Prioridad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Actualizado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="mt-1 h-3 w-64" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16" />
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

function ProcessesTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm">No se encontraron procesos</p>
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
          <TableHead>Nombre</TableHead>
          <TableHead>Pasos</TableHead>
          <TableHead>Prioridad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Actualizado</TableHead>
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
                <p className="text-muted-foreground mt-0.5 max-w-[300px] truncate text-xs">
                  {process.description}
                </p>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {process.stepsCount}
            </TableCell>
            <TableCell>
              <Badge variant={priorityVariants[process.priority]}>
                {PROCESS_PRIORITY_LABELS[process.priority]}
              </Badge>
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
