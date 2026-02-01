'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { ProductsTable } from '@/src/modules/products/components/ProductsTable';
import { Product } from '@/src/modules/products/types';
import { DUMMY_PRODUCTS } from '@/src/modules/products/utils/dummy';
// import { getProducts } from '@/src/modules/products/services';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // async function fetchProducts() {
    //   try {
    //     const response = await getProducts({ page: 1, pageSize: 10 });
    //     setProducts(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch products:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchProducts();

    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setProducts(DUMMY_PRODUCTS);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Products</h1>
        </div>
        <Button size="sm">
          <Plus />
          Add Product
        </Button>
      </header>
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-0">
            <ProductsTable products={products} isLoading={isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
