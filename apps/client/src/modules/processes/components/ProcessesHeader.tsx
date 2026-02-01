'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus } from 'lucide-react';
import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Tabs, TabsList, TabsTrigger } from '@/src/common/Tabs';

interface ProcessesHeaderProps {
  showNewButton?: boolean;
}

export function ProcessesHeader({ showNewButton = true }: ProcessesHeaderProps) {
  const pathname = usePathname();
  const isWorkflows = pathname.includes('/workflows');
  const activeTab = isWorkflows ? 'workflows' : 'processes';

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Procesos</h1>
        <Tabs value={activeTab}>
          <TabsList variant="line">
            <TabsTrigger value="processes" asChild>
              <Link href="/app/processes">Plantillas</Link>
            </TabsTrigger>
            <TabsTrigger value="workflows" asChild>
              <Link href="/app/processes/workflows">Ejecuciones</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {showNewButton && (
        <Link href={isWorkflows ? '/app/processes/workflows/create' : '/app/processes/create'}>
          <Button size="sm">
            <Plus />
            {isWorkflows ? 'Nueva Ejecución' : 'Nuevo Proceso'}
          </Button>
        </Link>
      )}
    </header>
  );
}
