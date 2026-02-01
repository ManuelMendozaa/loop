import { z } from 'zod';

export const MetricUnitSchema = z.enum([
  'lt',
  'ml',
  'kg',
  'g',
  'units',
  'oz',
  'lb',
]);

export const IngredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  metricUnit: MetricUnitSchema,
  stock: z.number(),
  minStock: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const IngredientListSchema = z.array(IngredientSchema);

export type MetricUnit = z.infer<typeof MetricUnitSchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type IngredientList = z.infer<typeof IngredientListSchema>;

export const METRIC_UNIT_LABELS: Record<MetricUnit, string> = {
  lt: 'Liters',
  ml: 'Milliliters',
  kg: 'Kilograms',
  g: 'Grams',
  units: 'Units',
  oz: 'Ounces',
  lb: 'Pounds',
};

export const METRIC_UNIT_ABBREVIATIONS: Record<MetricUnit, string> = {
  lt: 'L',
  ml: 'ml',
  kg: 'kg',
  g: 'g',
  units: 'units',
  oz: 'oz',
  lb: 'lb',
};

// Selected ingredient with amount for process steps
export const SelectedIngredientSchema = z.object({
  ingredientId: z.string(),
  ingredient: IngredientSchema,
  amount: z.number(),
});

export type SelectedIngredient = z.infer<typeof SelectedIngredientSchema>;

export interface IngredientsResponse {
  data: IngredientList;
  total: number;
  page: number;
  pageSize: number;
}

export const IngredientsResponseSchema = z.object({
  data: IngredientListSchema,
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export * from './data';
