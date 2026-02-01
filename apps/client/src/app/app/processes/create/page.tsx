'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Save, Loader2 } from 'lucide-react';

import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { AddStepModal } from '@/src/modules/processes/components/steps/AddStepModal';
import { ProcessStepCard } from '@/src/modules/processes/components/steps/ProcessStepCard';
import { ProcessStep } from '@/src/modules/processes/types/process';

function EmptySteps({ onAddClick }: { onAddClick: () => void }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div className="bg-muted mb-4 rounded-full p-3">
          <Plus className="text-muted-foreground size-6" />
        </div>
        <h3 className="mb-1 font-medium">No steps configured</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Add steps to define the production process for this product
        </p>
        <Button onClick={onAddClick}>
          <Plus />
          Add First Step
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ProcessPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [steps, setSteps] = useState<ProcessStep[]>([]);

  const handleAddStep = (stepData: Omit<ProcessStep, 'id' | 'order'>) => {
    const newStep: ProcessStep = {
      ...stepData,
      id: `step-${Date.now()}`,
      order: steps.length + 1,
    };
    setSteps([...steps, newStep]);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(
      steps
        .filter((s) => s.id !== id)
        .map((s, index) => ({ ...s, order: index + 1 }))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/app/processes`}>
              <ArrowLeft />
              Processes
            </Link>
          </Button>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-lg font-semibold">Process Configuration</h1>
        </div>
        <div className="flex items-center gap-2">
          {steps.length > 0 && (
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
              {isSaving ? 'Saving...' : 'Save Process'}
            </Button>
          )}
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Process Steps</h2>
              <p className="text-muted-foreground text-sm">
                Define the steps required to process this product
              </p>
            </div>
            {steps.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus />
                Add Step
              </Button>
            )}
          </div>

          {steps.length === 0 ? (
            <EmptySteps onAddClick={() => setIsAddModalOpen(true)} />
          ) : (
            <div className="space-y-3">
              {steps.map((step, index) => (
                <ProcessStepCard
                  key={step.id}
                  step={step}
                  stepNumber={index + 1}
                  onDelete={handleDeleteStep}
                />
              ))}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="border-muted hover:border-primary hover:bg-muted/50 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4 text-sm transition-colors"
              >
                <Plus className="size-4" />
                Add Another Step
              </button>
            </div>
          )}
        </div>
      </main>

      <AddStepModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={handleAddStep}
      />
    </div>
  );
}
