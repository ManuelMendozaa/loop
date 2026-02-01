'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { ProvidersTable } from '@/src/modules/providers/components/ProvidersTable';
import { Provider, DUMMY_PROVIDERS } from '@/src/modules/providers/types';
// import { getProviders } from '@/src/modules/providers/services';

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // async function fetchProviders() {
    //   try {
    //     const response = await getProviders({ page: 1, pageSize: 10 });
    //     setProviders(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch providers:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchProviders();

    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setProviders(DUMMY_PROVIDERS);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Providers</h1>
        </div>
        <Button size="sm">
          <Plus />
          Add Provider
        </Button>
      </header>
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-0">
            <ProvidersTable providers={providers} isLoading={isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
