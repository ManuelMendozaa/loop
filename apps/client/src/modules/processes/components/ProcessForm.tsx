'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/src/common/Button';
import { DUMMY_PROVIDERS } from '../../providers/types';
import { ProcessStep, ProcessPriority } from '../types/process';
import { AddStepModal } from './steps/AddStepModal';
import { ProcessStepCard } from './steps/ProcessStepCard';
import { EmptySteps } from './steps/EmptySteps';
import { ProcessBasicInformation } from './form/ProcessBasicInformation';
import { ProcessFormHeader } from './form/ProcessFormHeader';
import { AddProcessStepContextProvider } from '../contexts/AddProcessStepContext';

export function ProcessForm() {
  const providers = DUMMY_PROVIDERS; // TODO: Fetch from API
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<ProcessStep | undefined>(
    undefined
  );

  // Basic info state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ProcessPriority>('medium');

  // Steps state
  const [steps, setSteps] = useState<ProcessStep[]>([]);

  const selectedProviders = useMemo(() => {
    const providerIds = new Set<string>();
    steps.forEach((step) => {
      step.providerIds?.forEach((id) => providerIds.add(id));
    });
    return Array.from(providerIds)
      .map((id) => providers.find((p) => p.id === id))
      .filter((x) => !!x);
  }, [steps, providers]);

  const canSave = name.trim() !== '' && steps.length > 0;

  const handleOpenAddModal = () => {
    setEditingStep(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (step: ProcessStep) => {
    setEditingStep(step);
    setIsModalOpen(true);
  };

  const handleAddStep = (stepData: Omit<ProcessStep, 'id' | 'order'>) => {
    if (editingStep) {
      setSteps(
        steps.map((s) =>
          s.id === editingStep.id
            ? { ...stepData, id: editingStep.id, order: editingStep.order }
            : s
        )
      );
    } else {
      const newStep: ProcessStep = {
        ...stepData,
        id: `step-${Date.now()}`,
        order: steps.length + 1,
      };
      setSteps([...steps, newStep]);
    }
    setEditingStep(undefined);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(
      steps
        .filter((s) => s.id !== id)
        .map((s, index) => ({ ...s, order: index + 1 }))
    );
  };

  const handleSave = async () => {
    if (!canSave) return;

    setIsSaving(true);
    // TODO: Save to API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingStep(undefined);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <ProcessFormHeader
        isSaving={isSaving}
        canSave={canSave}
        handleSave={handleSave}
      />

      <main className="flex-1 space-y-6 overflow-auto p-6">
        <ProcessBasicInformation
          name={name}
          description={description}
          priority={priority}
          steps={steps}
          setName={setName}
          setDescription={setDescription}
          setPriority={setPriority}
          canSave={canSave}
        />

        {/* Steps Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Process Steps</h2>
              <p className="text-muted-foreground text-sm">
                Define the steps required to complete this process
              </p>
            </div>
            {steps.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleOpenAddModal}>
                <Plus />
                Add Step
              </Button>
            )}
          </div>

          {steps.length === 0 ? (
            <EmptySteps onAddClick={handleOpenAddModal} />
          ) : (
            <div className="space-y-3">
              {steps.map((step, index) => (
                <ProcessStepCard
                  key={step.id}
                  step={step}
                  stepNumber={index + 1}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteStep}
                />
              ))}
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="border-muted hover:border-primary hover:bg-muted/50 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4 text-sm transition-colors"
              >
                <Plus className="size-4" />
                Add Another Step
              </button>
            </div>
          )}
        </div>
      </main>

      <AddProcessStepContextProvider>
        <AddStepModal
          open={isModalOpen}
          onOpenChange={handleModalClose}
          onSubmit={handleAddStep}
          step={editingStep}
          providers={providers}
        />
      </AddProcessStepContextProvider>
    </div>
  );
}
