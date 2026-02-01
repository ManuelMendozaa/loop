'use client';

import {
  GripVertical,
  Trash2,
  Clock,
  User,
  Leaf,
  Variable,
  Pencil,
  ChefHat,
  Factory,
  ClipboardCheck,
  Package,
  Truck,
  Settings,
  Building2,
  LucideIcon,
} from 'lucide-react';

import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { Badge } from '@/src/common/Badge';
import {
  ProcessStep,
  StepType,
  STEP_TYPE_LABELS,
  DURATION_UNIT_LABELS,
  OutputVariable,
} from '../../types/process';
import { METRIC_UNIT_ABBREVIATIONS, METRIC_UNIT_LABELS } from '@/src/modules/ingredients/types';
import { DUMMY_PROVIDERS } from '@/src/modules/providers/types';

const STEP_TYPE_ICONS: Record<StepType, LucideIcon> = {
  preparation: ChefHat,
  production: Factory,
  quality_check: ClipboardCheck,
  packaging: Package,
  shipping: Truck,
  custom: Settings,
};

function getVariableDisplayName(variable: OutputVariable): string {
  switch (variable.type) {
    case 'product':
      return variable.product?.name || 'Unknown product';
    case 'ingredient':
      return variable.ingredient?.name || 'Unknown ingredient';
    default:
      return variable.name || 'Unknown';
  }
}

interface ProcessStepCardProps {
  step: ProcessStep;
  stepNumber: number;
  onEdit?: (step: ProcessStep) => void;
  onDelete: (id: string) => void;
}

function ProcessStepCard({ step, stepNumber, onEdit, onDelete }: ProcessStepCardProps) {
  const StepIcon = STEP_TYPE_ICONS[step.type];

  return (
    <Card className="group relative">
      <CardContent className="flex gap-4 p-4">
        <div className="text-muted-foreground flex cursor-grab items-center">
          <GripVertical className="size-5" />
        </div>
        <div className="bg-primary text-primary-foreground relative flex size-10 shrink-0 items-center justify-center rounded-lg">
          <StepIcon className="size-5" />
          <span className="bg-background text-foreground absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs font-medium shadow-sm ring-1 ring-border">
            {stepNumber}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium">{step.name}</h4>
              <p className="text-muted-foreground mt-1 text-sm">
                {step.description}
              </p>
            </div>
            <Badge variant="outline">{STEP_TYPE_LABELS[step.type]}</Badge>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            {step.estimatedDuration && step.durationUnit && (
              <div className="text-muted-foreground flex items-center gap-1">
                <Clock className="size-4" />
                <span>
                  {step.estimatedDuration}{' '}
                  {DURATION_UNIT_LABELS[step.durationUnit].toLowerCase()}
                </span>
              </div>
            )}
            {step.assignee && (
              <div className="text-muted-foreground flex items-center gap-1">
                <User className="size-4" />
                <span>{step.assignee}</span>
              </div>
            )}
            {step.ingredients && step.ingredients.length > 0 && (
              <div className="text-muted-foreground flex items-center gap-1">
                <Leaf className="size-4" />
                <span>{step.ingredients.length} ingredients</span>
              </div>
            )}
            {step.outputVariables && step.outputVariables.length > 0 && (
              <div className="text-muted-foreground flex items-center gap-1">
                <Variable className="size-4" />
                <span>{step.outputVariables.length} output variables</span>
              </div>
            )}
            {step.providerIds && step.providerIds.length > 0 && (
              <div className="text-muted-foreground flex items-center gap-1">
                <Building2 className="size-4" />
                <span>{step.providerIds.length} providers</span>
              </div>
            )}
          </div>
          {step.ingredients && step.ingredients.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {step.ingredients.map((selected) => (
                <span
                  key={selected.ingredientId}
                  className="bg-muted rounded px-2 py-0.5 text-xs"
                >
                  {METRIC_UNIT_ABBREVIATIONS[selected.ingredient.metricUnit]}{' '}
                  {selected.ingredient.name}
                </span>
              ))}
            </div>
          )}
          {step.outputVariables && step.outputVariables.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {step.outputVariables.map((variable) => (
                <span
                  key={variable.id}
                  className="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs"
                >
                  {getVariableDisplayName(variable)} ({METRIC_UNIT_LABELS[variable.unit]})
                </span>
              ))}
            </div>
          )}
          {step.providerIds && step.providerIds.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {step.providerIds.map((providerId) => {
                const provider = DUMMY_PROVIDERS.find((p) => p.id === providerId);
                return provider ? (
                  <span
                    key={providerId}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded px-2 py-0.5 text-xs"
                  >
                    {provider.name}
                  </span>
                ) : null;
              })}
            </div>
          )}
          {step.notes && (
            <p className="text-muted-foreground mt-2 text-xs italic">
              {step.notes}
            </p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(step)}
            >
              <Pencil className="size-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(step.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProcessStepCard, STEP_TYPE_ICONS };
export type { ProcessStepCardProps };
