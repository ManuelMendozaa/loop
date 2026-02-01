'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

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
import { Ingredient, METRIC_UNIT_ABBREVIATIONS } from '../types';

interface IngredientsTableProps {
  ingredients: Ingredient[];
  isLoading?: boolean;
}

function getStockStatus(
  stock: number,
  minStock?: number
): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (stock === 0) return 'out_of_stock';
  if (minStock && stock <= minStock) return 'low_stock';
  return 'in_stock';
}

const stockStatusVariants: Record<
  'in_stock' | 'low_stock' | 'out_of_stock',
  'default' | 'secondary' | 'destructive'
> = {
  in_stock: 'default',
  low_stock: 'secondary',
  out_of_stock: 'destructive',
};

const stockStatusLabels: Record<
  'in_stock' | 'low_stock' | 'out_of_stock',
  string
> = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

function IngredientsTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Min Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
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
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
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

function IngredientsTableEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-muted-foreground text-sm">No ingredients found</p>
    </div>
  );
}

function IngredientsTable({ ingredients, isLoading }: IngredientsTableProps) {
  if (isLoading) {
    return <IngredientsTableSkeleton />;
  }

  if (ingredients.length === 0) {
    return <IngredientsTableEmpty />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Min Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ingredients.map((ingredient) => {
          const stockStatus = getStockStatus(ingredient.stock, ingredient.minStock);
          const isLowOrOut = stockStatus !== 'in_stock';

          return (
            <TableRow key={ingredient.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/app/ingredients/${ingredient.id}`}
                  className="hover:text-primary hover:underline"
                >
                  {ingredient.name}
                </Link>
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[200px] truncate">
                {ingredient.description || '—'}
              </TableCell>
              <TableCell>{METRIC_UNIT_ABBREVIATIONS[ingredient.metricUnit]}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  {isLowOrOut && (
                    <AlertTriangle className="text-destructive size-3.5" />
                  )}
                  <span className={isLowOrOut ? 'text-destructive' : ''}>
                    {ingredient.stock}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {ingredient.minStock ?? '—'}
              </TableCell>
              <TableCell>
                <Badge variant={stockStatusVariants[stockStatus]}>
                  {stockStatusLabels[stockStatus]}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(ingredient.updatedAt)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export { IngredientsTable, IngredientsTableSkeleton, IngredientsTableEmpty };
export type { IngredientsTableProps };
