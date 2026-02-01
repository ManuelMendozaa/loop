import { Leaf, Variable } from 'lucide-react';

import {
  DURATION_UNIT_LABELS,
  DurationUnit,
  STEP_TYPE_LABELS,
  StepType,
  OutputVariable,
} from '../../types/process';
import {
  SelectedIngredient,
  METRIC_UNIT_ABBREVIATIONS,
  METRIC_UNIT_LABELS,
} from '@/src/modules/ingredients/types';

export function ReviewStep({
  type,
  name,
  description,
  duration,
  durationUnit,
  assignee,
  notes,
  ingredients,
  outputVariables,
}: {
  type: StepType;
  name: string;
  description: string;
  duration: string;
  durationUnit: DurationUnit;
  assignee: string;
  notes: string;
  ingredients: SelectedIngredient[];
  outputVariables: OutputVariable[];
}) {
  const validVariables = outputVariables.filter((v) => v.name.trim());

  return (
    <div className="space-y-4">
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium">{STEP_TYPE_LABELS[type]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{name || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">
              {duration
                ? `${duration} ${DURATION_UNIT_LABELS[durationUnit].toLowerCase()}`
                : '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Assignee</span>
            <span className="font-medium">{assignee || '—'}</span>
          </div>
        </div>
      </div>
      {description && (
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Description</p>
          <p className="text-sm">{description}</p>
        </div>
      )}
      {ingredients.length > 0 && (
        <div>
          <p className="text-muted-foreground mb-2 text-sm">Ingredients</p>
          <div className="space-y-2">
            {ingredients.map((selected) => (
              <div
                key={selected.ingredientId}
                className="bg-muted/50 flex items-center gap-2 rounded-md px-3 py-2"
              >
                <Leaf className="text-muted-foreground size-4" />
                <span className="flex-1 text-sm">
                  {selected.ingredient.name}
                </span>
                <span className="text-sm font-medium">
                  {selected.amount}{' '}
                  {METRIC_UNIT_ABBREVIATIONS[selected.ingredient.metricUnit]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {validVariables.length > 0 && (
        <div>
          <p className="text-muted-foreground mb-2 text-sm">Output Variables</p>
          <div className="space-y-2">
            {validVariables.map((variable) => (
              <div
                key={variable.id}
                className="bg-muted/50 flex items-center gap-2 rounded-md px-3 py-2"
              >
                <Variable className="text-muted-foreground size-4" />
                <span className="flex-1 text-sm">{variable.name}</span>
                <span className="text-muted-foreground text-sm">
                  {METRIC_UNIT_LABELS[variable.unit]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {notes && (
        <div>
          <p className="text-muted-foreground mb-1 text-sm">Notes</p>
          <p className="text-sm">{notes}</p>
        </div>
      )}
    </div>
  );
}
