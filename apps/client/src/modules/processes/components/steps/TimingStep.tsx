'use client';

import { Input } from '@/src/common/Input';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/src/common/Field';
import { durationUnits } from '@/src/utils/time';
import { useStep } from '../../hooks/useStep';

export function TimingStep() {
  const { step, setStep } = useStep();

  const isBatchStep = step?.executionType === 'batch';

  const durationLabel = isBatchStep
    ? 'Total Duration'
    : 'Duration per Iteration';

  const durationDescription = isBatchStep
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
            value={step?.estimatedDuration ?? ''}
            onChange={(e) =>
              setStep({ ...step, estimatedDuration: Number(e.target.value) })
            }
            className="flex-1"
          />
          <div className="flex rounded-md border">
            {durationUnits.map((unit) => (
              <button
                key={unit.value}
                type="button"
                onClick={() => setStep({ ...step, durationUnit: unit.value })}
                className={`px-3 py-2 text-sm transition-colors ${
                  step?.durationUnit === unit.value
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                } first:rounded-l-md last:rounded-r-md`}
              >
                {unit.label}
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
          value={step?.assignee ?? ''}
          onChange={(e) => setStep({ ...step, assignee: e.target.value })}
        />
        <FieldDescription>
          Person or team responsible for completing this step
        </FieldDescription>
      </Field>
    </FieldGroup>
  );
}
