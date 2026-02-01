'use client';

import { GripVertical, Trash2, Clock, User, Leaf, Variable } from 'lucide-react';

import { Button } from '@/src/common/Button';
import { Card, CardContent } from '@/src/common/Card';
import { Badge } from '@/src/common/Badge';
import {
  ProcessStep,
  STEP_TYPE_LABELS,
  DURATION_UNIT_LABELS,
} from '../../types/process';
import { METRIC_UNIT_ABBREVIATIONS, METRIC_UNIT_LABELS } from '@/src/modules/ingredients/types';

interface ProcessStepCardProps {
  step: ProcessStep;
  stepNumber: number;
  onDelete: (id: string) => void;
}

function ProcessStepCard({ step, stepNumber, onDelete }: ProcessStepCardProps) {
  return (
    <Card className="group relative">
      <CardContent className="flex gap-4 p-4">
        <div className="text-muted-foreground flex cursor-grab items-center">
          <GripVertical className="size-5" />
        </div>
        <div className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
          {stepNumber}
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
          </div>
          {step.ingredients && step.ingredients.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {step.ingredients.map((selected) => (
                <span
                  key={selected.ingredientId}
                  className="bg-muted rounded px-2 py-0.5 text-xs"
                >
                  {selected.amount}{' '}
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
                  {variable.name} ({METRIC_UNIT_LABELS[variable.unit]})
                </span>
              ))}
            </div>
          )}
          {step.notes && (
            <p className="text-muted-foreground mt-2 text-xs italic">
              {step.notes}
            </p>
          )}
        </div>
        <div className="opacity-0 transition-opacity group-hover:opacity-100">
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

export { ProcessStepCard };
export type { ProcessStepCardProps };
