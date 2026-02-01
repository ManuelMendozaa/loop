'use client';

import { Plus, Trash2, Variable, Package } from 'lucide-react';

import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/src/common/Field';
import { Separator } from '@/src/common/Separator';
import { OutputVariable } from '../../types/process';
import { Product } from '../../types';
import {
  MetricUnit,
  METRIC_UNIT_LABELS,
} from '@/src/modules/ingredients/types';

interface VariablesStepProps {
  variables: OutputVariable[];
  products: Product[];
  onVariablesChange: (variables: OutputVariable[]) => void;
}

const METRIC_UNITS: MetricUnit[] = ['lt', 'ml', 'kg', 'g', 'units', 'oz', 'lb'];

export function VariablesStep({
  variables,
  products,
  onVariablesChange,
}: VariablesStepProps) {
  const handleAddVariable = () => {
    const newVariable: OutputVariable = {
      id: `var-${Date.now()}`,
      name: '',
      unit: 'units',
    };
    onVariablesChange([...variables, newVariable]);
  };

  const handleRemoveVariable = (id: string) => {
    onVariablesChange(variables.filter((v) => v.id !== id));
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

  return (
    <Field>
      <FieldLabel>Output Variables</FieldLabel>
      <FieldDescription>
        Define the output values that will be recorded when this step is completed.
        Optionally associate each variable with a product.
      </FieldDescription>

      <div className="mt-3 space-y-3">
        {variables.length > 0 && (
          <div className="rounded-lg border">
            {variables.map((variable, index) => (
              <div key={variable.id}>
                {index > 0 && <Separator />}
                <div className="space-y-3 p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                      <Variable className="text-muted-foreground size-4" />
                    </div>
                    <div className="flex flex-1 items-center gap-2">
                      <Input
                        placeholder="Variable name (e.g., Output Weight)"
                        value={variable.name}
                        onChange={(e) =>
                          handleNameChange(variable.id, e.target.value)
                        }
                        className="flex-1"
                      />
                      <select
                        value={variable.unit}
                        onChange={(e) =>
                          handleUnitChange(variable.id, e.target.value as MetricUnit)
                        }
                        className="border-input bg-background h-9 rounded-md border px-3 text-sm"
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
                  <div className="flex items-center gap-3 pl-11">
                    <Package className="text-muted-foreground size-4" />
                    <select
                      value={variable.productId || ''}
                      onChange={(e) =>
                        handleProductChange(variable.id, e.target.value)
                      }
                      className="border-input bg-background h-9 flex-1 rounded-md border px-3 text-sm"
                    >
                      <option value="">No product (general variable)</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.sku})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
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
