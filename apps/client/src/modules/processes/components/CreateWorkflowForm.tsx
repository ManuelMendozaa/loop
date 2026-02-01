'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/common/Card';
import { Field, FieldGroup, FieldLabel } from '@/src/common/Field';
import { SidebarTrigger } from '@/src/common/Sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/common/DropdownMenu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/common/Dialog';
import { toast } from '@/src/common/Sonner';
import { Process, DUMMY_PROCESS_DETAILS, ProcessStep } from '../types/process';
import { SelectedIngredient, METRIC_UNIT_ABBREVIATIONS } from '@/src/modules/ingredients/types';
import { ProcessStepsPreview } from './ProcessStepsPreview';

interface IngredientAmount {
  ingredientId: string;
  name: string;
  unit: string;
  suggestedAmount: number;
  actualAmount: number;
}

export function CreateWorkflowForm() {
  const router = useRouter();
  const [processes, setProcesses] = useState<Process[]>([]);
  const [isLoadingProcesses, setIsLoadingProcesses] = useState(true);

  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [selectedProcessSteps, setSelectedProcessSteps] = useState<ProcessStep[]>([]);
  const [isLoadingSteps, setIsLoadingSteps] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ingredients modal state
  const [showIngredientsModal, setShowIngredientsModal] = useState(false);
  const [ingredientAmounts, setIngredientAmounts] = useState<IngredientAmount[]>([]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setProcesses(DUMMY_PROCESS_DETAILS.filter((p) => p.status === 'active'));
      setIsLoadingProcesses(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const canStart = selectedProcess && workflowName.trim() !== '' && startDate !== '';

  const handleSelectProcess = (process: Process) => {
    setSelectedProcess(process);
    setIsLoadingSteps(true);
    setSelectedProcessSteps([]);

    // Simulate API call to fetch process steps
    setTimeout(() => {
      const fullProcess = DUMMY_PROCESS_DETAILS.find((p) => p.id === process.id);
      setSelectedProcessSteps(fullProcess?.steps ?? []);
      setIsLoadingSteps(false);
    }, 800);
  };

  const getFirstStepIngredients = (): SelectedIngredient[] => {
    if (selectedProcessSteps.length === 0) return [];
    const firstStep = selectedProcessSteps[0];
    return firstStep.ingredients ?? [];
  };

  const handleStart = () => {
    if (!canStart) return;

    const firstStepIngredients = getFirstStepIngredients();

    if (firstStepIngredients.length > 0) {
      // Initialize ingredient amounts from the first step
      const amounts: IngredientAmount[] = firstStepIngredients.map((ing) => ({
        ingredientId: ing.ingredientId,
        name: ing.ingredient.name,
        unit: METRIC_UNIT_ABBREVIATIONS[ing.ingredient.metricUnit],
        suggestedAmount: ing.amount,
        actualAmount: ing.amount,
      }));
      setIngredientAmounts(amounts);
      setShowIngredientsModal(true);
    } else {
      // No ingredients, proceed directly
      submitWorkflow();
    }
  };

  const handleIngredientAmountChange = (ingredientId: string, value: number) => {
    setIngredientAmounts((prev) =>
      prev.map((ing) =>
        ing.ingredientId === ingredientId ? { ...ing, actualAmount: value } : ing
      )
    );
  };

  const submitWorkflow = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Ejecución iniciada correctamente');
    setIsSubmitting(false);
    setShowIngredientsModal(false);
    router.push('/app/processes/workflows');
  };

  const handleConfirmIngredients = () => {
    submitWorkflow();
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/app/processes/workflows">
            <ArrowLeft />
            Ejecuciones
          </Link>
        </Button>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-lg font-semibold">Nueva Ejecución</h1>
      </header>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          {/* Left: Form and Summary */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar nueva ejecución</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel>Proceso</FieldLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                          disabled={isLoadingProcesses}
                        >
                          {isLoadingProcesses ? (
                            <span className="text-muted-foreground">Cargando...</span>
                          ) : selectedProcess ? (
                            selectedProcess.name
                          ) : (
                            <span className="text-muted-foreground">
                              Seleccionar proceso
                            </span>
                          )}
                          <ChevronDown className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                        {processes.map((process) => (
                          <DropdownMenuItem
                            key={process.id}
                            onClick={() => handleSelectProcess(process)}
                          >
                            <div>
                              <p className="font-medium">{process.name}</p>
                              <p className="text-muted-foreground text-xs">
                                {process.steps.length} pasos
                              </p>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="name">Nombre de la ejecución</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Ej: Lote #1045 - Café Premium"
                      value={workflowName}
                      onChange={(e) => setWorkflowName(e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="startDate">Fecha de inicio</FieldLabel>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Summary Card */}
            {selectedProcess && !isLoadingSteps && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Resumen del proceso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {selectedProcess.description}
                  </p>
                  <div className="mt-3 flex gap-4 text-sm">
                    <span>
                      <strong>{selectedProcessSteps.length}</strong> pasos
                    </span>
                    {getFirstStepIngredients().length > 0 && (
                      <span>
                        <strong>{getFirstStepIngredients().length}</strong>{' '}
                        ingredientes en el primer paso
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Start Button */}
            <Button
              onClick={handleStart}
              disabled={!canStart || isSubmitting || isLoadingSteps}
              className="w-full"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Play className="size-4" />
              )}
              {isSubmitting ? 'Iniciando...' : 'Iniciar Ejecución'}
            </Button>
          </div>

          {/* Right: Process Steps Preview */}
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-6">
            <h3 className="text-lg font-semibold mb-4">Pasos del proceso</h3>
            {selectedProcess ? (
              <ProcessStepsPreview
                steps={selectedProcessSteps}
                isLoading={isLoadingSteps}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground text-sm">
                  Selecciona un proceso para ver sus pasos
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Dialog open={showIngredientsModal} onOpenChange={setShowIngredientsModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cantidades de Ingredientes</DialogTitle>
            <DialogDescription>
              Ingresa las cantidades de ingredientes para el primer paso:{' '}
              <strong>{selectedProcessSteps[0]?.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {ingredientAmounts.map((ingredient) => (
              <div
                key={ingredient.ingredientId}
                className="flex items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{ingredient.name}</p>
                  <p className="text-muted-foreground text-xs">
                    Sugerido: {ingredient.suggestedAmount} {ingredient.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    value={ingredient.actualAmount}
                    onChange={(e) =>
                      handleIngredientAmountChange(
                        ingredient.ingredientId,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-24 text-right"
                  />
                  <span className="text-muted-foreground w-8 text-sm">
                    {ingredient.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowIngredientsModal(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirmIngredients} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}
              {isSubmitting ? 'Iniciando...' : 'Confirmar e Iniciar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
