'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { ProcessesTable } from '@/src/modules/processes/components/ProcessesTable';
import { Process, DUMMY_PROCESSES } from '@/src/modules/processes/types';
import Link from 'next/link';

export default function ProcessesPage() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // async function fetchProcesses() {
    //   try {
    //     const response = await getProcesses({ page: 1, pageSize: 10 });
    //     setProcesses(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch processes:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchProcesses();

    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setProcesses(DUMMY_PROCESSES);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Processes</h1>
        </div>
        <Link href="/app/processes/create">
          <Button size="sm">
            <Plus />
            New Process
          </Button>
        </Link>
      </header>
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-0">
            <ProcessesTable processes={processes} isLoading={isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
