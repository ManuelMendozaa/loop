'use client';

import Link from 'next/link';
import { CheckCircle2, Clock, Circle, XCircle, Hourglass } from 'lucide-react';

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
import { Workflow, WorkflowStatus, WORKFLOW_STATUS_LABELS } from '../types/workflow';

interface WorkflowsTableProps {
  workflows: Workflow[];
  isLoading?: boolean;
}

const statusVariants: Record<
  WorkflowStatus,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  pending: 'outline',
  in_progress: 'default',
  completed: 'secondary',
  cancelled: 'destructive',
};

const StatusIcon = ({ status }: { status: WorkflowStatus }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="size-3.5" />;
    case 'in_progress':
      return <Clock className="size-3.5" />;
    case 'cancelled':
      return <XCircle className="size-3.5" />;
    case 'pending':
      return <Hourglass className="size-3.5" />;
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

function WorkflowsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Proceso</TableHead>
          <TableHead>Progreso</TableHead>
          <TableHead>Asignado</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Actualizado</TableHead>
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

function WorkflowsTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm">No se encontraron ejecuciones</p>
    </div>
  );
}

function WorkflowsTable({ workflows, isLoading }: WorkflowsTableProps) {
  if (isLoading) {
    return <WorkflowsTableSkeleton />;
  }

  if (workflows.length === 0) {
    return <WorkflowsTableEmpty />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Proceso</TableHead>
          <TableHead>Progreso</TableHead>
          <TableHead>Asignado</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Actualizado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workflows.map((workflow) => (
          <TableRow key={workflow.id}>
            <TableCell>
              <Link
                href={`/app/processes/workflows/${workflow.id}`}
                className="hover:text-primary hover:underline"
              >
                <span className="font-medium">{workflow.name}</span>
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/app/processes/${workflow.processId}`}
                className="text-muted-foreground hover:text-primary text-sm hover:underline"
              >
                {workflow.processName}
              </Link>
            </TableCell>
            <TableCell>
              <ProgressBar
                completed={workflow.completedSteps}
                total={workflow.stepsCount}
              />
            </TableCell>
            <TableCell className="text-muted-foreground">
              {workflow.assignee || '—'}
            </TableCell>
            <TableCell>
              <Badge
                variant={statusVariants[workflow.status]}
                className="gap-1"
              >
                <StatusIcon status={workflow.status} />
                {WORKFLOW_STATUS_LABELS[workflow.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDate(workflow.updatedAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { WorkflowsTable, WorkflowsTableSkeleton, WorkflowsTableEmpty };
export type { WorkflowsTableProps };
