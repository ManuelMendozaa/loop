'use client';

import { Input } from '@/src/common/Input';
import { Textarea } from '@/src/common/textarea';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/src/common/Field';
import { SelectedIngredient } from '@/src/modules/ingredients/types';
import { StepType } from '../../types/process';
import { IngredientSelector } from './components/IngredientSelector';

interface DetailsStepProps {
  stepType: StepType | null;
  name: string;
  description: string;
  notes: string;
  ingredients: SelectedIngredient[];
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onIngredientsChange: (ingredients: SelectedIngredient[]) => void;
}

function GeneralInfoFields({
  name,
  description,
  notes,
  onNameChange,
  onDescriptionChange,
  onNotesChange,
}: {
  name: string;
  description: string;
  notes: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="step-name">Step Name</FieldLabel>
        <Input
          id="step-name"
          placeholder="Enter step name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="step-description">Description</FieldLabel>
        <Textarea
          id="step-description"
          placeholder="Describe what happens in this step"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
        <FieldDescription>
          Provide clear instructions for this step
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="step-notes">Additional Notes</FieldLabel>
        <Textarea
          id="step-notes"
          placeholder="Any additional notes or requirements (optional)"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </Field>
    </FieldGroup>
  );
}

export function DetailsStep({
  stepType,
  name,
  description,
  notes,
  ingredients,
  onNameChange,
  onDescriptionChange,
  onNotesChange,
  onIngredientsChange,
}: DetailsStepProps) {
  const isPreparation = stepType === 'preparation';

  if (isPreparation) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="mb-4 text-sm font-medium">General Information</h4>
          <GeneralInfoFields
            name={name}
            description={description}
            notes={notes}
            onNameChange={onNameChange}
            onDescriptionChange={onDescriptionChange}
            onNotesChange={onNotesChange}
          />
        </div>
        <div>
          <IngredientSelector
            selectedIngredients={ingredients}
            onIngredientsChange={onIngredientsChange}
          />
        </div>
      </div>
    );
  }

  return (
    <GeneralInfoFields
      name={name}
      description={description}
      notes={notes}
      onNameChange={onNameChange}
      onDescriptionChange={onDescriptionChange}
      onNotesChange={onNotesChange}
    />
  );
}
