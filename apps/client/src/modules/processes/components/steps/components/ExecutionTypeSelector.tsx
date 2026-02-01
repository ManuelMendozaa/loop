'use client';

import { Layers, RefreshCw } from 'lucide-react';
import { Field, FieldDescription, FieldLabel } from '@/src/common/Field';
import { EXECUTION_TYPE_LABELS } from '../../../types/process';
import { useStep } from '../../../hooks/useStep';

export function ExecutionTypeSelector() {
  const { step, setStep } = useStep();

  return (
    <Field>
      <FieldLabel>Execution Type</FieldLabel>
      <FieldDescription>How this step processes items</FieldDescription>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => setStep({ ...step, executionType: 'batch' })}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
            step?.executionType === 'batch'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input bg-background hover:bg-muted'
          }`}
        >
          <Layers className="size-4" />
          {EXECUTION_TYPE_LABELS.batch}
        </button>
        <button
          type="button"
          onClick={() => setStep({ ...step, executionType: 'continuous' })}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
            step?.executionType === 'continuous'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input bg-background hover:bg-muted'
          }`}
        >
          <RefreshCw className="size-4" />
          {EXECUTION_TYPE_LABELS.continuous}
        </button>
      </div>
      <p className="text-muted-foreground mt-2 text-xs">
        {step?.executionType === 'batch'
          ? 'Process all items together in a single run'
          : 'Process items one at a time in a continuous flow'}
      </p>
    </Field>
  );
}
