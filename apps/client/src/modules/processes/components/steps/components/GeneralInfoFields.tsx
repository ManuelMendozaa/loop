'use client';

import { Input } from '@/src/common/Input';
import { Textarea } from '@/src/common/textarea';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/src/common/Field';
import { useStep } from '../../../hooks/useStep';
import { ExecutionTypeSelector } from './ExecutionTypeSelector';

export function GeneralInfoFields() {
  const { step, setStep } = useStep();

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="step-name">Step Name</FieldLabel>
        <Input
          id="step-name"
          placeholder="Enter step name"
          value={step?.name ?? ''}
          onChange={(e) => setStep({ ...step, name: e.target.value })}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="step-description">Description</FieldLabel>
        <Textarea
          id="step-description"
          placeholder="Describe what happens in this step"
          value={step?.description ?? ''}
          onChange={(e) => setStep({ ...step, description: e.target.value })}
        />
        <FieldDescription>
          Provide clear instructions for this step
        </FieldDescription>
      </Field>
      <ExecutionTypeSelector />
      <Field>
        <FieldLabel htmlFor="step-notes">Additional Notes</FieldLabel>
        <Textarea
          id="step-notes"
          placeholder="Any additional notes or requirements (optional)"
          value={step?.notes ?? ''}
          onChange={(e) => setStep({ ...step, notes: e.target.value })}
        />
      </Field>
    </FieldGroup>
  );
}
