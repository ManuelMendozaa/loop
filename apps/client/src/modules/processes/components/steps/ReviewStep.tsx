import { Leaf, Variable, Package, FileText, StickyNote } from 'lucide-react';

import {
  DURATION_UNIT_LABELS,
  DurationUnit,
  STEP_TYPE_LABELS,
  StepType,
  OutputVariable,
  OutputVariableType,
} from '../../types/process';
import {
  SelectedIngredient,
  METRIC_UNIT_ABBREVIATIONS,
  METRIC_UNIT_LABELS,
} from '@/src/modules/ingredients/types';

function getVariableIcon(type: OutputVariableType) {
  switch (type) {
    case 'product':
      return Package;
    case 'ingredient':
      return Leaf;
    default:
      return Variable;
  }
}

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

function isValidVariable(variable: OutputVariable): boolean {
  if (variable.type === 'name') return !!variable.name?.trim();
  if (variable.type === 'product') return !!variable.productId;
  if (variable.type === 'ingredient') return !!variable.ingredientId;
  return false;
}

interface ReviewSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ReviewSection({ title, icon, children }: ReviewSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-medium">{title}</h4>
      </div>
      {children}
    </div>
  );
}

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
  const validVariables = outputVariables.filter(isValidVariable);

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        {/* General Info */}
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

        {/* Description */}
        {description && (
          <ReviewSection
            title="Description"
            icon={<FileText className="text-muted-foreground size-4" />}
          >
            <p className="text-muted-foreground text-sm">{description}</p>
          </ReviewSection>
        )}

        {/* Notes */}
        {notes && (
          <ReviewSection
            title="Notes"
            icon={<StickyNote className="text-muted-foreground size-4" />}
          >
            <p className="text-muted-foreground text-sm">{notes}</p>
          </ReviewSection>
        )}
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {/* Ingredients */}
        <ReviewSection
          title="Ingredients"
          icon={<Leaf className="text-muted-foreground size-4" />}
        >
          {ingredients.length > 0 ? (
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
                  <span className="text-muted-foreground text-sm">
                    {METRIC_UNIT_ABBREVIATIONS[selected.ingredient.metricUnit]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No ingredients added</p>
          )}
        </ReviewSection>

        {/* Output Variables */}
        <ReviewSection
          title="Output Variables"
          icon={<Variable className="text-muted-foreground size-4" />}
        >
          {validVariables.length > 0 ? (
            <div className="space-y-2">
              {validVariables.map((variable) => {
                const Icon = getVariableIcon(variable.type);
                return (
                  <div
                    key={variable.id}
                    className="bg-muted/50 flex items-center gap-2 rounded-md px-3 py-2"
                  >
                    <Icon className="text-muted-foreground size-4" />
                    <span className="flex-1 text-sm">
                      {getVariableDisplayName(variable)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {METRIC_UNIT_LABELS[variable.unit]}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No output variables defined</p>
          )}
        </ReviewSection>
      </div>
    </div>
  );
}
