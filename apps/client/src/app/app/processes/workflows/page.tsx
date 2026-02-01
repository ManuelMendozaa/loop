'use client';

import { useState, useEffect } from 'react';

import { Card, CardContent } from '@/src/common/Card';
import { WorkflowsTable } from '@/src/modules/processes/components/WorkflowsTable';
import { ProcessesHeader } from '@/src/modules/processes/components/ProcessesHeader';
import { Workflow, DUMMY_WORKFLOWS } from '@/src/modules/processes/types/workflow';

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading with dummy data
    const timer = setTimeout(() => {
      setWorkflows(DUMMY_WORKFLOWS);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <ProcessesHeader />
      <main className="flex-1 p-6">
        <Card>
          <CardContent className="p-0">
            <WorkflowsTable workflows={workflows} isLoading={isLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
