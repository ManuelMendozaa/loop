'use client';

import { useState } from 'react';
import { Building2, Plus, Trash2, Layers, RefreshCw } from 'lucide-react';
import { Input } from '@/src/common/Input';
import { Textarea } from '@/src/common/textarea';
import { Button } from '@/src/common/Button';
import { Separator } from '@/src/common/Separator';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/src/common/Field';
import { SelectedIngredient } from '@/src/modules/ingredients/types';
import { DUMMY_PROVIDERS, Provider } from '@/src/modules/providers/types';
import {
  StepType,
  ExecutionType,
  EXECUTION_TYPE_LABELS,
} from '../../types/process';
import { IngredientSelector } from './components/IngredientSelector';

interface DetailsStepProps {
  stepType: StepType | null;
  name: string;
  description: string;
  notes: string;
  executionType: ExecutionType;
  ingredients: SelectedIngredient[];
  providerIds: string[];
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onExecutionTypeChange: (executionType: ExecutionType) => void;
  onIngredientsChange: (ingredients: SelectedIngredient[]) => void;
  onProvidersChange: (providerIds: string[]) => void;
}

function ExecutionTypeSelector({
  value,
  onChange,
}: {
  value: ExecutionType;
  onChange: (value: ExecutionType) => void;
}) {
  return (
    <Field>
      <FieldLabel>Execution Type</FieldLabel>
      <FieldDescription>
        How this step processes items
      </FieldDescription>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => onChange('batch')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
            value === 'batch'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input bg-background hover:bg-muted'
          }`}
        >
          <Layers className="size-4" />
          {EXECUTION_TYPE_LABELS.batch}
        </button>
        <button
          type="button"
          onClick={() => onChange('continuous')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
            value === 'continuous'
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-input bg-background hover:bg-muted'
          }`}
        >
          <RefreshCw className="size-4" />
          {EXECUTION_TYPE_LABELS.continuous}
        </button>
      </div>
      <p className="text-muted-foreground mt-2 text-xs">
        {value === 'batch'
          ? 'Process all items together in a single run'
          : 'Process items one at a time in a continuous flow'}
      </p>
    </Field>
  );
}

function GeneralInfoFields({
  name,
  description,
  notes,
  executionType,
  onNameChange,
  onDescriptionChange,
  onNotesChange,
  onExecutionTypeChange,
}: {
  name: string;
  description: string;
  notes: string;
  executionType: ExecutionType;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onExecutionTypeChange: (executionType: ExecutionType) => void;
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
      <ExecutionTypeSelector
        value={executionType}
        onChange={onExecutionTypeChange}
      />
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

function ProviderSelector({
  providerIds,
  onProvidersChange,
}: {
  providerIds: string[];
  onProvidersChange: (providerIds: string[]) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allProviders = DUMMY_PROVIDERS;
  const selectedProviders = providerIds
    .map((id) => allProviders.find((p) => p.id === id))
    .filter((p): p is Provider => p !== undefined);

  const availableProviders = allProviders.filter(
    (p) => !providerIds.includes(p.id)
  );

  const filteredProviders = availableProviders.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProvider = (provider: Provider) => {
    onProvidersChange([...providerIds, provider.id]);
    setSearchQuery('');
    setIsAdding(false);
  };

  const handleRemoveProvider = (providerId: string) => {
    onProvidersChange(providerIds.filter((id) => id !== providerId));
  };

  return (
    <Field>
      <FieldLabel>Providers</FieldLabel>
      <FieldDescription>
        Select providers responsible for this production step
      </FieldDescription>

      <div className="mt-2 space-y-2">
        {selectedProviders.length > 0 && (
          <div className="rounded-lg border">
            {selectedProviders.map((provider, index) => (
              <div key={provider.id}>
                {index > 0 && <Separator />}
                <div className="flex items-center gap-3 p-3">
                  <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                    <Building2 className="text-muted-foreground size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {provider.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {provider.type} · {provider.city}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleRemoveProvider(provider.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdding ? (
          <div className="rounded-lg border p-3">
            <Input
              type="text"
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <div className="mt-2 max-h-48 overflow-y-auto">
              {filteredProviders.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  {availableProviders.length === 0
                    ? 'All providers have been added'
                    : 'No providers found'}
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredProviders.map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => handleAddProvider(provider)}
                      className="hover:bg-muted flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors"
                    >
                      <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                        <Building2 className="text-muted-foreground size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {provider.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {provider.type} · {provider.city}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setSearchQuery('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="w-full"
            disabled={availableProviders.length === 0}
          >
            <Plus className="size-4" />
            Add Provider
          </Button>
        )}
      </div>
    </Field>
  );
}

export function DetailsStep({
  stepType,
  name,
  description,
  notes,
  executionType,
  ingredients,
  providerIds,
  onNameChange,
  onDescriptionChange,
  onNotesChange,
  onExecutionTypeChange,
  onIngredientsChange,
  onProvidersChange,
}: DetailsStepProps) {
  const isPreparation = stepType === 'preparation';
  const isProduction = stepType === 'production';
  const hasRightPanel = isPreparation || isProduction;

  if (hasRightPanel) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="mb-4 text-sm font-medium">General Information</h4>
          <GeneralInfoFields
            name={name}
            description={description}
            notes={notes}
            executionType={executionType}
            onNameChange={onNameChange}
            onDescriptionChange={onDescriptionChange}
            onNotesChange={onNotesChange}
            onExecutionTypeChange={onExecutionTypeChange}
          />
        </div>
        <div>
          {isPreparation && (
            <IngredientSelector
              selectedIngredients={ingredients}
              onIngredientsChange={onIngredientsChange}
            />
          )}
          {isProduction && (
            <ProviderSelector
              providerIds={providerIds}
              onProvidersChange={onProvidersChange}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <GeneralInfoFields
      name={name}
      description={description}
      notes={notes}
      executionType={executionType}
      onNameChange={onNameChange}
      onDescriptionChange={onDescriptionChange}
      onNotesChange={onNotesChange}
      onExecutionTypeChange={onExecutionTypeChange}
    />
  );
}
