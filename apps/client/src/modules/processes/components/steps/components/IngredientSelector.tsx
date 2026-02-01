'use client';

import { useState } from 'react';
import { Plus, Trash2, Leaf } from 'lucide-react';

import { Button } from '@/src/common/Button';
import { Input } from '@/src/common/Input';
import { Field, FieldDescription, FieldLabel } from '@/src/common/Field';
import { Separator } from '@/src/common/Separator';
import {
  Ingredient,
  SelectedIngredient,
  METRIC_UNIT_ABBREVIATIONS,
  DUMMY_INGREDIENTS,
} from '@/src/modules/ingredients/types';

interface IngredientSelectorProps {
  selectedIngredients: SelectedIngredient[];
  onIngredientsChange: (ingredients: SelectedIngredient[]) => void;
}

function IngredientSelector({
  selectedIngredients,
  onIngredientsChange,
}: IngredientSelectorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter out already selected ingredients
  const availableIngredients = DUMMY_INGREDIENTS.filter(
    (ing) => !selectedIngredients.some((sel) => sel.ingredientId === ing.id)
  );

  // Filter by search query
  const filteredIngredients = availableIngredients.filter((ing) =>
    ing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddIngredient = (ingredient: Ingredient) => {
    const newSelected: SelectedIngredient = {
      ingredientId: ingredient.id,
      ingredient,
      amount: 1,
    };
    onIngredientsChange([...selectedIngredients, newSelected]);
    setSearchQuery('');
    setIsAdding(false);
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    onIngredientsChange(
      selectedIngredients.filter((sel) => sel.ingredientId !== ingredientId)
    );
  };

  return (
    <Field>
      <FieldLabel>Ingredients</FieldLabel>
      <FieldDescription>
        Select ingredients required for this preparation step
      </FieldDescription>

      <div className="mt-2 space-y-2">
        {selectedIngredients.length > 0 && (
          <div className="rounded-lg border">
            {selectedIngredients.map((selected, index) => (
              <div key={selected.ingredientId}>
                {index > 0 && <Separator />}
                <div className="flex items-center gap-3 p-3">
                  <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                    <Leaf className="text-muted-foreground size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {selected.ingredient.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Available: {selected.ingredient.stock}{' '}
                      {
                        METRIC_UNIT_ABBREVIATIONS[
                          selected.ingredient.metricUnit
                        ]
                      }
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      handleRemoveIngredient(selected.ingredientId)
                    }
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
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <div className="mt-2 max-h-48 overflow-y-auto">
              {filteredIngredients.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  {availableIngredients.length === 0
                    ? 'All ingredients have been added'
                    : 'No ingredients found'}
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredIngredients.map((ingredient) => (
                    <button
                      key={ingredient.id}
                      type="button"
                      onClick={() => handleAddIngredient(ingredient)}
                      className="hover:bg-muted flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors"
                    >
                      <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
                        <Leaf className="text-muted-foreground size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {ingredient.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {ingredient.stock}{' '}
                          {METRIC_UNIT_ABBREVIATIONS[ingredient.metricUnit]}{' '}
                          available
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
            disabled={availableIngredients.length === 0}
          >
            <Plus className="size-4" />
            Add Ingredient
          </Button>
        )}
      </div>
    </Field>
  );
}

export { IngredientSelector };
