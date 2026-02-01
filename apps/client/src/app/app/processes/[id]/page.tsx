'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProcessForm } from '@/src/modules/processes/components/ProcessForm';
import { Process, DUMMY_PROCESS_DETAILS } from '@/src/modules/processes/types/process';
import { Skeleton } from '@/src/common/Skeleton';

function ProcessProfileSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </header>
      <main className="flex-1 space-y-6 p-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </main>
    </div>
  );
}

export default function ProcessProfilePage() {
  const params = useParams();
  const processId = params.id as string;
  const [process, setProcess] = useState<Process | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const timer = setTimeout(() => {
      const foundProcess = DUMMY_PROCESS_DETAILS.find((p) => p.id === processId);
      setProcess(foundProcess ?? null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [processId]);

  if (isLoading) {
    return <ProcessProfileSkeleton />;
  }

  if (!process) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Proceso no encontrado</p>
      </div>
    );
  }

  return <ProcessForm process={process} />;
}
