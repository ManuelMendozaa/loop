'use client';

import { Plus, Trash2, Variable, Package, Leaf } from 'lucide-react';

import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/src/common/Field';
import { Separator } from '@/src/common/Separator';
import {
  OutputVariable,
  OutputVariableType,
  OUTPUT_VARIABLE_TYPE_LABELS,
} from '../../types/process';
import { Product } from '@/src/modules/products/types';
import {
  Ingredient,
  MetricUnit,
  METRIC_UNIT_LABELS,
  DUMMY_INGREDIENTS,
} from '@/src/modules/ingredients/types';

interface VariablesStepProps {
  variables: OutputVariable[];
  products: Product[];
  onVariablesChange: (variables: OutputVariable[]) => void;
}

const METRIC_UNITS: MetricUnit[] = ['lt', 'ml', 'kg', 'g', 'units', 'oz', 'lb'];
const OUTPUT_VARIABLE_TYPES: OutputVariableType[] = ['name', 'product', 'ingredient'];

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

export function VariablesStep({
  variables,
  products,
  onVariablesChange,
}: VariablesStepProps) {
  const ingredients: Ingredient[] = DUMMY_INGREDIENTS;

  const handleAddVariable = () => {
    const newVariable: OutputVariable = {
      id: `var-${Date.now()}`,
      type: 'name',
      name: '',
      unit: 'units',
    };
    onVariablesChange([...variables, newVariable]);
  };

  const handleRemoveVariable = (id: string) => {
    onVariablesChange(variables.filter((v) => v.id !== id));
  };

  const handleTypeChange = (id: string, type: OutputVariableType) => {
    onVariablesChange(
      variables.map((v) =>
        v.id === id
          ? {
              ...v,
              type,
              name: type === 'name' ? '' : undefined,
              productId: undefined,
              product: undefined,
              ingredientId: undefined,
              ingredient: undefined,
            }
          : v
      )
    );
  };

  const handleNameChange = (id: string, name: string) => {
    onVariablesChange(
      variables.map((v) => (v.id === id ? { ...v, name } : v))
    );
  };

  const handleUnitChange = (id: string, unit: MetricUnit) => {
    onVariablesChange(
      variables.map((v) => (v.id === id ? { ...v, unit } : v))
    );
  };

  const handleProductChange = (id: string, productId: string) => {
    const product = products.find((p) => p.id === productId);
    onVariablesChange(
      variables.map((v) =>
        v.id === id
          ? {
              ...v,
              productId: productId || undefined,
              product: product || undefined,
            }
          : v
      )
    );
  };

  const handleIngredientChange = (id: string, ingredientId: string) => {
    const ingredient = ingredients.find((i) => i.id === ingredientId);
    onVariablesChange(
      variables.map((v) =>
        v.id === id
          ? {
              ...v,
              ingredientId: ingredientId || undefined,
              ingredient: ingredient || undefined,
              unit: ingredient?.metricUnit || v.unit,
            }
          : v
      )
    );
  };

  const renderValueSelector = (variable: OutputVariable) => {
    switch (variable.type) {
      case 'name':
        return (
          <Input
            placeholder="Variable name (e.g., Output Weight)"
            value={variable.name || ''}
            onChange={(e) => handleNameChange(variable.id, e.target.value)}
            className="flex-1"
          />
        );
      case 'product':
        return (
          <select
            value={variable.productId || ''}
            onChange={(e) => handleProductChange(variable.id, e.target.value)}
            className="border-input bg-background h-9 flex-1 rounded-md border px-3 text-sm"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.sku})
              </option>
            ))}
          </select>
        );
      case 'ingredient':
        return (
          <select
            value={variable.ingredientId || ''}
            onChange={(e) => handleIngredientChange(variable.id, e.target.value)}
            className="border-input bg-background h-9 flex-1 rounded-md border px-3 text-sm"
          >
            <option value="">Select an ingredient</option>
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        );
    }
  };

  return (
    <Field>
      <FieldLabel>Output Variables</FieldLabel>
      <FieldDescription>
        Define the output values that will be recorded when this step is completed.
      </FieldDescription>

      <div className="mt-3 space-y-3">
        {variables.length > 0 && (
          <div className="rounded-lg border">
            {variables.map((variable, index) => {
              const Icon = getVariableIcon(variable.type);
              return (
                <div key={variable.id}>
                  {index > 0 && <Separator />}
                  <div className="space-y-3 p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                        <Icon className="text-muted-foreground size-4" />
                      </div>
                      <div className="flex flex-1 items-center gap-2">
                        <select
                          value={variable.type}
                          onChange={(e) =>
                            handleTypeChange(variable.id, e.target.value as OutputVariableType)
                          }
                          className="border-input bg-background h-9 w-32 rounded-md border px-3 text-sm"
                        >
                          {OUTPUT_VARIABLE_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {OUTPUT_VARIABLE_TYPE_LABELS[type]}
                            </option>
                          ))}
                        </select>
                        {renderValueSelector(variable)}
                        <select
                          value={variable.unit}
                          onChange={(e) =>
                            handleUnitChange(variable.id, e.target.value as MetricUnit)
                          }
                          className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                          disabled={variable.type === 'ingredient' && !!variable.ingredient}
                        >
                          {METRIC_UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                              {METRIC_UNIT_LABELS[unit]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRemoveVariable(variable.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddVariable}
          className="w-full"
        >
          <Plus className="size-4" />
          Add Output Variable
        </Button>

        {variables.length === 0 && (
          <p className="text-muted-foreground py-4 text-center text-sm">
            No output variables defined. Click the button above to add variables
            that will be recorded when this step completes.
          </p>
        )}
      </div>
    </Field>
  );
}
