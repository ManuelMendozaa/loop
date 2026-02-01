'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Save,
  Loader2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { SidebarTrigger } from '@/src/common/Sidebar';
import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import { Textarea } from '@/src/common/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/common/Card';
import { Badge } from '@/src/common/Badge';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/src/common/Field';
import {
  ProcessStep,
  ProcessPriority,
  PROCESS_PRIORITY_LABELS,
  PROCESS_PRIORITIES,
  DurationUnit,
} from '../types/process';
import { AddStepModal } from './steps/AddStepModal';
import { ProcessStepCard } from './steps/ProcessStepCard';
import { EmptySteps } from './steps/EmptySteps';

const PRIORITY_VARIANTS: Record<
  ProcessPriority,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  low: 'outline',
  medium: 'secondary',
  high: 'default',
  urgent: 'destructive',
};

function computeTotalTime(
  steps: ProcessStep[]
): { value: number; unit: DurationUnit } | null {
  let totalMinutes = 0;

  for (const step of steps) {
    if (step.estimatedDuration && step.durationUnit) {
      switch (step.durationUnit) {
        case 'minutes':
          totalMinutes += step.estimatedDuration;
          break;
        case 'hours':
          totalMinutes += step.estimatedDuration * 60;
          break;
        case 'days':
          totalMinutes += step.estimatedDuration * 60 * 24;
          break;
      }
    }
  }

  if (totalMinutes === 0) return null;

  // Convert to most appropriate unit
  if (totalMinutes >= 60 * 24) {
    const days = totalMinutes / (60 * 24);
    return { value: Math.round(days * 10) / 10, unit: 'days' };
  } else if (totalMinutes >= 60) {
    const hours = totalMinutes / 60;
    return { value: Math.round(hours * 10) / 10, unit: 'hours' };
  }

  return { value: totalMinutes, unit: 'minutes' };
}

function formatDuration(
  duration: { value: number; unit: DurationUnit } | null
): string {
  if (!duration) return '—';

  const unitLabels: Record<DurationUnit, string> = {
    minutes: 'min',
    hours: 'hrs',
    days: 'days',
  };

  return `${duration.value} ${unitLabels[duration.unit]}`;
}

export function ProcessForm() {
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

  const totalTime = useMemo(() => computeTotalTime(steps), [steps]);
  const totalIngredients = useMemo(() => {
    const ingredientIds = new Set<string>();
    steps.forEach((step) => {
      step.ingredients?.forEach((ing) => ingredientIds.add(ing.ingredientId));
    });
    return ingredientIds.size;
  }, [steps]);

  const canSave = name.trim() !== '' && steps.length > 0;

  const handleOpenAddModal = () => {
    setEditingStep(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (step: ProcessStep) => {
    setEditingStep(step);
    setIsModalOpen(true);
  };

  const handleSubmitStep = (stepData: Omit<ProcessStep, 'id' | 'order'>) => {
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
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app/processes">
              <ArrowLeft />
              Processes
            </Link>
          </Button>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-lg font-semibold">New Process</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={isSaving || !canSave}>
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
            {isSaving ? 'Saving...' : 'Save Process'}
          </Button>
        </div>
      </header>

      <main className="flex-1 space-y-6 overflow-auto p-6">
        {/* Basic Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="process-name">Process Name</FieldLabel>
                    <Input
                      id="process-name"
                      placeholder="Enter process name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FieldDescription>
                      A descriptive name for this process
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="process-description">
                      Description
                    </FieldLabel>
                    <Textarea
                      id="process-description"
                      placeholder="Describe the purpose of this process"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="process-priority">Priority</FieldLabel>
                    <select
                      id="process-priority"
                      value={priority}
                      onChange={(e) =>
                        setPriority(e.target.value as ProcessPriority)
                      }
                      className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                    >
                      {PROCESS_PRIORITIES.map((p) => (
                        <option key={p} value={p}>
                          {PROCESS_PRIORITY_LABELS[p]}
                        </option>
                      ))}
                    </select>
                  </Field>
                </FieldGroup>
              </div>

              {/* Summary Panel */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="mb-4 text-sm font-medium">Process Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Status
                    </span>
                    <Badge variant="outline">Draft</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Priority
                    </span>
                    <Badge variant={PRIORITY_VARIANTS[priority]}>
                      {PROCESS_PRIORITY_LABELS[priority]}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Total Steps
                    </span>
                    <span className="text-sm font-medium">{steps.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Estimated Time
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="size-3.5" />
                      {formatDuration(totalTime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Ingredients
                    </span>
                    <span className="text-sm font-medium">
                      {totalIngredients > 0
                        ? `${totalIngredients} unique`
                        : '—'}
                    </span>
                  </div>
                </div>

                {!canSave && (
                  <div className="mt-4 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <div className="text-xs text-amber-800 dark:text-amber-200">
                      {!name.trim() && <p>Process name is required</p>}
                      {steps.length === 0 && (
                        <p>At least one step is required</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

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

      <AddStepModal
        open={isModalOpen}
        onOpenChange={handleModalClose}
        onSubmit={handleSubmitStep}
        step={editingStep}
      />
    </div>
  );
}
