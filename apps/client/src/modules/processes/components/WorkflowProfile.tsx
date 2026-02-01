'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Circle,
  DollarSign,
  ArrowRight,
  LogIn,
  LogOut,
  Plus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/src/common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/common/Card';
import { Badge } from '@/src/common/Badge';
import { Skeleton } from '@/src/common/Skeleton';
import { SidebarTrigger } from '@/src/common/Sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/common/Dialog';
import { Input } from '@/src/common/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/common/Select';
import { toast } from '@/src/common/Sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/common/Table';
import {
  WorkflowDetail,
  WorkflowStep,
  WorkflowStepStatus,
  WORKFLOW_STATUS_LABELS,
  DUMMY_WORKFLOW_DETAILS,
} from '../types/workflow';
import { STEP_TYPES } from '../types/process';

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

const stepStatusIcons: Record<WorkflowStepStatus, React.ReactNode> = {
  completed: <CheckCircle2 className="size-5 text-green-600" />,
  in_progress: <Clock className="size-5 text-blue-600" />,
  pending: <Circle className="size-5 text-muted-foreground" />,
};

function WorkflowProfileSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-4 border-b px-6">
        <Skeleton className="size-8" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-6 w-48" />
      </header>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export function WorkflowProfile() {
  const params = useParams();
  const workflowId = params.id as string;
  const [workflow, setWorkflow] = useState<WorkflowDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [editedInputs, setEditedInputs] = useState<Record<string, number>>({});
  const [editedOutputs, setEditedOutputs] = useState<Record<string, number>>(
    {}
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [completeOutputs, setCompleteOutputs] = useState<
    Record<string, number>
  >({});
  const [isCompleting, setIsCompleting] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    stepId: '',
    providerId: '',
    amount: '',
  });
  const [paymentModalStep, setPaymentModalStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const found = DUMMY_WORKFLOW_DETAILS.find((w) => w.id === workflowId);
      setWorkflow(found ?? null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [workflowId]);

  useEffect(() => {
    if (selectedStep) {
      const inputs: Record<string, number> = {};
      const outputs: Record<string, number> = {};
      selectedStep.inputVariables?.forEach((v) => {
        inputs[v.id] = v.value;
      });
      selectedStep.outputVariables?.forEach((v) => {
        outputs[v.id] = v.value;
      });
      // eslint-disable-next-line
      setEditedInputs(inputs);
      setEditedOutputs(outputs);
    }
  }, [selectedStep]);

  const handleStepClick = (step: WorkflowStep) => {
    if (step.status === 'completed') {
      setSelectedStep(step);
    }
  };

  const handleInputChange = (id: string, value: number) => {
    setEditedInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleOutputChange = (id: string, value: number) => {
    setEditedOutputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveVariables = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Variables actualizadas correctamente');
    setIsSaving(false);
    setSelectedStep(null);
  };

  const currentStep = workflow?.steps.find((s) => s.status === 'in_progress');
  const nextStep = workflow?.steps.find(
    (s) => s.status === 'pending' && s.order === (currentStep?.order ?? 0) + 1
  );

  const handleOpenCompleteModal = () => {
    if (currentStep?.outputVariables) {
      const outputs: Record<string, number> = {};
      currentStep.outputVariables.forEach((v) => {
        outputs[v.id] = v.value;
      });
      setCompleteOutputs(outputs);
    } else {
      setCompleteOutputs({});
    }
    setIsCompleteModalOpen(true);
  };

  const handleCompleteOutputChange = (id: string, value: number) => {
    setCompleteOutputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleCompleteStep = async () => {
    if (!workflow || !currentStep) return;

    setIsCompleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update local state to reflect completion
    const updatedSteps = workflow.steps.map((step) => {
      if (step.id === currentStep.id) {
        return {
          ...step,
          status: 'completed' as const,
          completedAt: new Date().toISOString(),
          outputVariables: step.outputVariables?.map((v) => ({
            ...v,
            value: completeOutputs[v.id] ?? v.value,
          })),
        };
      }
      if (nextStep && step.id === nextStep.id) {
        return {
          ...step,
          status: 'in_progress' as const,
          startedAt: new Date().toISOString(),
        };
      }
      return step;
    });

    const newCompletedSteps = updatedSteps.filter(
      (s) => s.status === 'completed'
    ).length;
    const allCompleted = newCompletedSteps === workflow.stepsCount;

    setWorkflow({
      ...workflow,
      steps: updatedSteps,
      completedSteps: newCompletedSteps,
      status: allCompleted ? 'completed' : 'in_progress',
      completedAt: allCompleted ? new Date().toISOString() : undefined,
    });

    toast.success(`Paso "${currentStep.name}" completado`);
    setIsCompleting(false);
    setIsCompleteModalOpen(false);
  };

  const completedSteps =
    workflow?.steps.filter((s) => s.status === 'completed') ?? [];

  const handleOpenPaymentModal = () => {
    setPaymentForm({
      stepId: '',
      providerId: '',
      amount: '',
    });
    setPaymentModalStep(1);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentFormChange = (field: string, value: string) => {
    // Reset providerId when step changes
    if (field === 'stepId') {
      setPaymentForm((prev) => ({ ...prev, stepId: value, providerId: '' }));
      setPaymentModalStep(2);
    } else if (field === 'providerId') {
      setPaymentForm((prev) => ({ ...prev, providerId: value }));
      setPaymentModalStep(3);
    } else {
      setPaymentForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const selectedPaymentStep = workflow?.steps.find(
    (s) => s.id === paymentForm.stepId
  );
  const availableProviders = selectedPaymentStep?.providers ?? [];
  const selectedProvider = availableProviders.find(
    (p) => p.id === paymentForm.providerId
  );

  const handleSavePayment = async () => {
    if (
      !workflow ||
      !paymentForm.stepId ||
      !paymentForm.providerId ||
      !paymentForm.amount
    ) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const stepForPayment = workflow.steps.find(
      (s) => s.id === paymentForm.stepId
    );
    if (!stepForPayment) return;

    const selectedProvider = stepForPayment.providers?.find(
      (p) => p.id === paymentForm.providerId
    );
    if (!selectedProvider) return;

    setIsSavingPayment(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newPayment = {
      id: `pay-${Date.now()}`,
      stepId: paymentForm.stepId,
      stepName: stepForPayment.name,
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      amount: parseFloat(paymentForm.amount),
      createdAt: new Date().toISOString(),
    };

    setWorkflow({
      ...workflow,
      payments: [...workflow.payments, newPayment],
      totalCost: workflow.totalCost + newPayment.amount,
    });

    toast.success('Pago registrado correctamente');
    setIsSavingPayment(false);
    setIsPaymentModalOpen(false);
  };

  if (isLoading) {
    return <WorkflowProfileSkeleton />;
  }

  if (!workflow) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Ejecución no encontrada</p>
      </div>
    );
  }

  const statusVariant = {
    pending: 'outline',
    in_progress: 'default',
    completed: 'secondary',
    cancelled: 'destructive',
  } as const;

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center justify-between gap-4 border-b px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app/processes/workflows">
              <ArrowLeft />
              Ejecuciones
            </Link>
          </Button>
          <span className="text-muted-foreground">/</span>
          <h1 className="text-lg font-semibold">{workflow.name}</h1>
          <Badge variant={statusVariant[workflow.status]}>
            {WORKFLOW_STATUS_LABELS[workflow.status]}
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          {/* Left: Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Pasos de la ejecución</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {workflow.steps.map((step, index) => {
                  const stepType = STEP_TYPES.find(
                    (t) => t.value === step.type
                  );
                  const Icon = stepType?.icon;
                  const isLast = index === workflow.steps.length - 1;
                  const isPending = step.status === 'pending';
                  const isCompleted = step.status === 'completed';

                  return (
                    <div
                      key={step.id}
                      className={`flex flex-col items-center w-full ${isPending ? 'opacity-40' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleStepClick(step)}
                        disabled={!isCompleted}
                        className={`flex items-start gap-4 w-full p-4 rounded-lg border bg-card text-left transition-all ${
                          isCompleted
                            ? 'cursor-pointer hover:border-primary hover:shadow-sm active:scale-[0.99]'
                            : 'cursor-default'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {stepStatusIcons[step.status]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {Icon && (
                              <Icon className="size-4 text-muted-foreground shrink-0" />
                            )}
                            <p className="font-medium text-sm">{step.name}</p>
                          </div>
                          <p className="text-muted-foreground text-xs mt-1">
                            {step.description}
                          </p>
                          {step.completedAt && (
                            <p className="text-xs text-green-600 mt-2">
                              Completado: {formatDate(step.completedAt)}
                            </p>
                          )}
                          {step.status === 'in_progress' && (
                            <p className="text-xs text-blue-600 mt-2">
                              En progreso...
                            </p>
                          )}
                        </div>
                        {isCompleted && (
                          <ArrowRight className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                        )}
                      </button>
                      {!isLast && (
                        <div className="h-6 border-l-2 border-dashed border-muted-foreground/30" />
                      )}
                    </div>
                  );
                })}
              </div>
              {currentStep && (
                <Button
                  onClick={handleOpenCompleteModal}
                  className="w-full mt-6"
                >
                  <CheckCircle2 />
                  Completar paso actual
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Right: Summary and Payments */}
          <div className="space-y-4">
            {/* Summary Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-green-100">
                    <DollarSign className="size-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(workflow.totalCost)}
                    </p>
                    <p className="text-muted-foreground text-sm">Costo total</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Proceso</p>
                    <p className="font-medium">{workflow.processName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pagos realizados</p>
                    <p className="font-medium">{workflow.payments.length}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Progreso</p>
                    <p className="font-medium">
                      {workflow.completedSteps} / {workflow.stepsCount} pasos
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Asignado a</p>
                    <p className="font-medium">{workflow.assignee || '—'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payments Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pagos</CardTitle>
                <Button size="sm" onClick={handleOpenPaymentModal}>
                  <Plus />
                  Nuevo pago
                </Button>
              </CardHeader>
              <CardContent>
                {workflow.payments.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">
                    No hay pagos registrados
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Paso</TableHead>
                        <TableHead>Proveedor</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workflow.payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">
                            {payment.stepName}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {payment.providerName}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Step Details Modal */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              {selectedStep?.name}
            </DialogTitle>
            <DialogDescription>{selectedStep?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Time Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Clock className="size-4" />
                  Inicio
                </div>
                <p className="font-medium">
                  {selectedStep?.startedAt
                    ? formatDate(selectedStep.startedAt)
                    : '—'}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <CheckCircle2 className="size-4" />
                  Fin
                </div>
                <p className="font-medium">
                  {selectedStep?.completedAt
                    ? formatDate(selectedStep.completedAt)
                    : '—'}
                </p>
              </div>
            </div>

            {/* Input Variables */}
            {selectedStep?.inputVariables &&
              selectedStep.inputVariables.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LogIn className="size-4 text-blue-600" />
                    <h4 className="font-medium text-sm">
                      Variables de entrada
                    </h4>
                  </div>
                  <div className="rounded-lg border divide-y">
                    {selectedStep.inputVariables.map((variable) => (
                      <div
                        key={variable.id}
                        className="flex items-center justify-between p-3 gap-4"
                      >
                        <span className="text-sm flex-1">{variable.name}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            value={editedInputs[variable.id] ?? variable.value}
                            onChange={(e) =>
                              handleInputChange(
                                variable.id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 text-right"
                          />
                          <span className="text-muted-foreground text-sm w-8">
                            {variable.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Output Variables */}
            {selectedStep?.outputVariables &&
              selectedStep.outputVariables.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LogOut className="size-4 text-green-600" />
                    <h4 className="font-medium text-sm">Variables de salida</h4>
                  </div>
                  <div className="rounded-lg border divide-y">
                    {selectedStep.outputVariables.map((variable) => (
                      <div
                        key={variable.id}
                        className="flex items-center justify-between p-3 gap-4"
                      >
                        <span className="text-sm flex-1">{variable.name}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            value={editedOutputs[variable.id] ?? variable.value}
                            onChange={(e) =>
                              handleOutputChange(
                                variable.id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 text-right"
                          />
                          <span className="text-muted-foreground text-sm w-8">
                            {variable.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* No variables message */}
            {(!selectedStep?.inputVariables ||
              selectedStep.inputVariables.length === 0) &&
              (!selectedStep?.outputVariables ||
                selectedStep.outputVariables.length === 0) && (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No hay variables registradas para este paso
                </p>
              )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedStep(null)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveVariables} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Step Modal */}
      <Dialog open={isCompleteModalOpen} onOpenChange={setIsCompleteModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="size-5 text-blue-600" />
              Completar paso: {currentStep?.name}
            </DialogTitle>
            <DialogDescription>{currentStep?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Step Transition Info */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Al completar este paso:
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="size-4 text-green-600" />
                  <span className="font-medium">{currentStep?.name}</span>
                </div>
                {nextStep && (
                  <>
                    <ArrowRight className="size-4 text-muted-foreground" />
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="size-4 text-blue-600" />
                      <span className="font-medium">{nextStep.name}</span>
                    </div>
                  </>
                )}
                {!nextStep && (
                  <span className="text-sm text-green-600 font-medium">
                    (Ejecución finalizada)
                  </span>
                )}
              </div>
            </div>

            {/* Output Variables */}
            {currentStep?.outputVariables &&
              currentStep.outputVariables.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LogOut className="size-4 text-green-600" />
                    <h4 className="font-medium text-sm">Variables de salida</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ingresa los valores de salida de este paso antes de
                    completarlo.
                  </p>
                  <div className="rounded-lg border divide-y">
                    {currentStep.outputVariables.map((variable) => (
                      <div
                        key={variable.id}
                        className="flex items-center justify-between p-3 gap-4"
                      >
                        <span className="text-sm flex-1">{variable.name}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            value={
                              completeOutputs[variable.id] ?? variable.value
                            }
                            onChange={(e) =>
                              handleCompleteOutputChange(
                                variable.id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24 text-right"
                          />
                          <span className="text-muted-foreground text-sm w-8">
                            {variable.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* No output variables message */}
            {(!currentStep?.outputVariables ||
              currentStep.outputVariables.length === 0) && (
              <p className="text-muted-foreground text-sm text-center py-4">
                Este paso no tiene variables de salida
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCompleteModalOpen(false)}
              disabled={isCompleting}
            >
              Cancelar
            </Button>
            <Button onClick={handleCompleteStep} disabled={isCompleting}>
              {isCompleting ? 'Completando...' : 'Confirmar y Completar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="size-5 text-green-600" />
              Registrar nuevo pago
            </DialogTitle>
            <DialogDescription>
              Completa los pasos para registrar el pago.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {/* Step 1: Select Step */}
            <div className="rounded-lg border">
              <button
                type="button"
                onClick={() => paymentForm.stepId && setPaymentModalStep(1)}
                className={`flex w-full items-center justify-between p-3 text-left ${
                  paymentModalStep === 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                      paymentForm.stepId
                        ? 'bg-green-100 text-green-600'
                        : paymentModalStep === 1
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {paymentForm.stepId ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      '1'
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Paso asociado</p>
                    {paymentForm.stepId && paymentModalStep !== 1 && (
                      <p className="text-xs text-muted-foreground">
                        {selectedPaymentStep?.name}
                      </p>
                    )}
                  </div>
                </div>
                {paymentForm.stepId && (
                  <div className="text-muted-foreground">
                    {paymentModalStep === 1 ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </div>
                )}
              </button>
              {paymentModalStep === 1 && (
                <div className="p-3">
                  {completedSteps.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">
                      No hay pasos completados
                    </p>
                  ) : (
                    <Select
                      value={paymentForm.stepId}
                      onValueChange={(value) =>
                        handlePaymentFormChange('stepId', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un paso" />
                      </SelectTrigger>
                      <SelectContent>
                        {completedSteps.map((step) => (
                          <SelectItem key={step.id} value={step.id}>
                            {step.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
            </div>

            {/* Step 2: Select Provider */}
            <div
              className={`rounded-lg border ${!paymentForm.stepId ? 'opacity-50' : ''}`}
            >
              <button
                type="button"
                onClick={() =>
                  paymentForm.stepId &&
                  paymentForm.providerId &&
                  setPaymentModalStep(2)
                }
                disabled={!paymentForm.stepId}
                className={`flex w-full items-center justify-between p-3 text-left ${
                  paymentModalStep === 2 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                      paymentForm.providerId
                        ? 'bg-green-100 text-green-600'
                        : paymentModalStep === 2
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {paymentForm.providerId ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      '2'
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Proveedor</p>
                    {paymentForm.providerId && paymentModalStep !== 2 && (
                      <p className="text-xs text-muted-foreground">
                        {selectedProvider?.name}
                      </p>
                    )}
                  </div>
                </div>
                {paymentForm.providerId && (
                  <div className="text-muted-foreground">
                    {paymentModalStep === 2 ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </div>
                )}
              </button>
              {paymentModalStep === 2 && (
                <div className="p-3">
                  {availableProviders.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">
                      No hay proveedores para este paso
                    </p>
                  ) : (
                    <Select
                      value={paymentForm.providerId}
                      onValueChange={(value) =>
                        handlePaymentFormChange('providerId', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un proveedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProviders.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
            </div>

            {/* Step 3: Enter Amount */}
            <div
              className={`rounded-lg border ${!paymentForm.providerId ? 'opacity-50' : ''}`}
            >
              <button
                type="button"
                onClick={() => paymentForm.providerId && setPaymentModalStep(3)}
                disabled={!paymentForm.providerId}
                className={`flex w-full items-center justify-between p-3 text-left ${
                  paymentModalStep === 3 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                      paymentForm.amount
                        ? 'bg-green-100 text-green-600'
                        : paymentModalStep === 3
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {paymentForm.amount ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      '3'
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Monto</p>
                    {paymentForm.amount && paymentModalStep !== 3 && (
                      <p className="text-xs text-muted-foreground">
                        ${paymentForm.amount}
                      </p>
                    )}
                  </div>
                </div>
                {paymentForm.amount && (
                  <div className="text-muted-foreground">
                    {paymentModalStep === 3 ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </div>
                )}
              </button>
              {paymentModalStep === 3 && (
                <div className="p-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="pl-7"
                      value={paymentForm.amount}
                      onChange={(e) =>
                        handlePaymentFormChange('amount', e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
              disabled={isSavingPayment}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSavePayment}
              disabled={
                isSavingPayment ||
                !paymentForm.stepId ||
                !paymentForm.providerId ||
                !paymentForm.amount
              }
            >
              {isSavingPayment ? 'Guardando...' : 'Guardar pago'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
