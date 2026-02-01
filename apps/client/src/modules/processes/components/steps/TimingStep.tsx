'use client';

import { Input } from '@/src/common/Input';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/src/common/Field';
import {
  DurationUnit,
  ExecutionType,
  DURATION_UNIT_LABELS,
  DURATION_UNITS,
} from '../../types/process';

interface TimingStepProps {
  duration: string;
  durationUnit: DurationUnit;
  assignee: string;
  executionType: ExecutionType;
  onDurationChange: (value: string) => void;
  onDurationUnitChange: (value: DurationUnit) => void;
  onAssigneeChange: (value: string) => void;
}

export function TimingStep({
  duration,
  durationUnit,
  assignee,
  executionType,
  onDurationChange,
  onDurationUnitChange,
  onAssigneeChange,
}: TimingStepProps) {
  const durationLabel =
    executionType === 'batch' ? 'Total Duration' : 'Duration per Iteration';
  const durationDescription =
    executionType === 'batch'
      ? 'Total time to complete the entire batch'
      : 'Time required for each iteration cycle';

  return (
    <FieldGroup>
      <Field>
        <FieldLabel>{durationLabel}</FieldLabel>
        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            placeholder="Duration"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="flex-1"
          />
          <div className="flex rounded-md border">
            {DURATION_UNITS.map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => onDurationUnitChange(unit)}
                className={`px-3 py-2 text-sm transition-colors ${
                  durationUnit === unit
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                } first:rounded-l-md last:rounded-r-md`}
              >
                {DURATION_UNIT_LABELS[unit]}
              </button>
            ))}
          </div>
        </div>
        <FieldDescription>{durationDescription}</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="step-assignee">Assignee</FieldLabel>
        <Input
          id="step-assignee"
          placeholder="Who is responsible for this step? (optional)"
          value={assignee}
          onChange={(e) => onAssigneeChange(e.target.value)}
        />
        <FieldDescription>
          Person or team responsible for completing this step
        </FieldDescription>
      </Field>
    </FieldGroup>
  );
}
