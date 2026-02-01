'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { MerchantsTable } from '@/src/modules/merchants/components/MerchantsTable';
import { Merchant, DUMMY_MERCHANTS } from '@/src/modules/merchants/types';
// import { getMerchants } from '@/src/modules/merchants/services';

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // async function fetchMerchants() {
    //   try {
    //     const response = await getMerchants({ page: 1, pageSize: 10 });
    //     setMerchants(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch merchants:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchMerchants();

    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setMerchants(DUMMY_MERCHANTS);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Merchants</h1>
        </div>
        <Button size="sm">
          <Plus />
          Add Merchant
        </Button>
      </header>
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-0">
            <MerchantsTable merchants={merchants} isLoading={isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
