'use client';

import { Package, ArrowLeft, Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/src/common/Button';
import { Badge } from '@/src/common/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/common/Card';
import { Separator } from '@/src/common/Separator';
import { Skeleton } from '@/src/common/Skeleton';
import { Product } from '../types';

interface ProductProfileProps {
  product: Product | null;
  isLoading?: boolean;
}

const statusVariants: Record<
  Product['status'],
  'default' | 'secondary' | 'destructive'
> = {
  active: 'default',
  inactive: 'secondary',
  out_of_stock: 'destructive',
};

const statusLabels: Record<Product['status'], string> = {
  active: 'Active',
  inactive: 'Inactive',
  out_of_stock: 'Out of Stock',
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
}

function ProductProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

function ProductNotFound() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Package className="text-muted-foreground mb-4 size-12" />
        <p className="text-muted-foreground text-sm">Product not found</p>
        <Button variant="outline" size="sm" className="mt-4" asChild>
          <Link href="/app/products">
            <ArrowLeft />
            Back to Products
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function BasicInformationSection({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>SKU: {product.sku}</CardDescription>
          </div>
          <Badge variant={statusVariants[product.status]}>
            {statusLabels[product.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <InfoRow label="Category">{product.category}</InfoRow>
        <Separator />
        <InfoRow label="Price">{formatCurrency(product.price)}</InfoRow>
        <Separator />
        <InfoRow label="SKU">{product.sku}</InfoRow>
        <Separator />
        <InfoRow label="Created">{formatDate(product.createdAt)}</InfoRow>
        <Separator />
        <InfoRow label="Last Updated">{formatDate(product.updatedAt)}</InfoRow>
      </CardContent>
    </Card>
  );
}

function StockSection({ product }: { product: Product }) {
  const stockLevel =
    product.stock === 0 ? 'out' : product.stock < 20 ? 'low' : 'normal';

  const stockVariant =
    stockLevel === 'out'
      ? 'destructive'
      : stockLevel === 'low'
        ? 'secondary'
        : 'default';

  const stockLabel =
    stockLevel === 'out'
      ? 'Out of Stock'
      : stockLevel === 'low'
        ? 'Low Stock'
        : 'In Stock';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Stock Information</CardTitle>
        <CardDescription>Current inventory levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{product.stock}</p>
            <p className="text-muted-foreground text-sm">units available</p>
          </div>
          <Badge variant={stockVariant}>{stockLabel}</Badge>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm">Reorder Point</p>
            <p className="font-medium">20 units</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Lead Time</p>
            <p className="font-medium">5-7 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProcessSection() {
  const params = useParams();
  const productId = params.id as string;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Process History</CardTitle>
        <CardDescription>
          Track product movement through the supply chain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
          <Package className="mb-3 size-10 opacity-50" />
          <p className="text-sm">No process configured</p>
          <p className="mb-4 text-xs">
            Configure process steps to track production
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/app/products/${productId}/process`}>
              <Settings />
              Configure Process
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductProfile({ product, isLoading }: ProductProfileProps) {
  if (isLoading) {
    return <ProductProfileSkeleton />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div className="space-y-6">
      <BasicInformationSection product={product} />
      <div className="grid gap-6 lg:grid-cols-2">
        <StockSection product={product} />
        <ProcessSection />
      </div>
    </div>
  );
}

export {
  ProductProfile,
  ProductProfileSkeleton,
  BasicInformationSection,
  StockSection,
  ProcessSection,
};
export type { ProductProfileProps };
