'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { ProductProfile } from '@/src/modules/products/components/ProductProfile';
import { Product } from '@/src/modules/products/types';
// import { getProduct } from '@/src/modules/products/services/getProduct';

// Dummy data for development - replace with API call
const DUMMY_PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Organic Coffee Beans',
    sku: 'COF-001',
    category: 'Beverages',
    price: 24.99,
    stock: 150,
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  },
  '2': {
    id: '2',
    name: 'Green Tea Premium',
    sku: 'TEA-002',
    category: 'Beverages',
    price: 18.5,
    stock: 89,
    status: 'active',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
  },
  '3': {
    id: '3',
    name: 'Almond Butter Natural',
    sku: 'NUT-003',
    category: 'Spreads',
    price: 12.99,
    stock: 0,
    status: 'out_of_stock',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
  },
  '4': {
    id: '4',
    name: 'Quinoa Organic',
    sku: 'GRN-004',
    category: 'Grains',
    price: 8.99,
    stock: 200,
    status: 'active',
    createdAt: '2024-01-08T13:45:00Z',
    updatedAt: '2024-01-19T10:30:00Z',
  },
  '5': {
    id: '5',
    name: 'Coconut Oil Extra Virgin',
    sku: 'OIL-005',
    category: 'Oils',
    price: 15.75,
    stock: 45,
    status: 'active',
    createdAt: '2024-01-05T07:30:00Z',
    updatedAt: '2024-01-21T09:00:00Z',
  },
  '6': {
    id: '6',
    name: 'Honey Raw Unfiltered',
    sku: 'SWT-006',
    category: 'Sweeteners',
    price: 22.0,
    stock: 12,
    status: 'active',
    createdAt: '2024-01-03T11:00:00Z',
    updatedAt: '2024-01-17T15:30:00Z',
  },
  '7': {
    id: '7',
    name: 'Dark Chocolate 85%',
    sku: 'CHO-007',
    category: 'Snacks',
    price: 6.5,
    stock: 0,
    status: 'inactive',
    createdAt: '2023-12-28T14:20:00Z',
    updatedAt: '2024-01-15T08:45:00Z',
  },
  '8': {
    id: '8',
    name: 'Chia Seeds',
    sku: 'SED-008',
    category: 'Seeds',
    price: 9.25,
    stock: 180,
    status: 'active',
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2024-01-20T12:15:00Z',
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // async function fetchProduct() {
    //   try {
    //     const data = await getProduct(productId);
    //     setProduct(data);
    //   } catch (error) {
    //     console.error('Failed to fetch product:', error);
    //     setProduct(null);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchProduct();

    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setProduct(DUMMY_PRODUCTS[productId] || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app/products">
              <ArrowLeft />
              Products
            </Link>
          </Button>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-lg font-semibold">
            {isLoading ? 'Loading...' : product?.name || 'Not Found'}
          </h1>
        </div>
        {product && (
          <Button variant="outline" size="sm">
            <Pencil />
            Edit
          </Button>
        )}
      </header>
      <main className="flex-1 p-6">
        <ProductProfile product={product} isLoading={isLoading} />
      </main>
    </div>
  );
}
