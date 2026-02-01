import { z } from 'zod';
import { SelectedIngredientSchema, MetricUnitSchema, IngredientSchema } from '@/src/modules/ingredients/types';
import { ProductSchema } from '@/src/modules/products/types';

export const OutputVariableTypeSchema = z.enum(['name', 'product', 'ingredient']);

export const OutputVariableSchema = z.object({
  id: z.string(),
  type: OutputVariableTypeSchema,
  name: z.string().optional(),
  unit: MetricUnitSchema,
  productId: z.string().optional(),
  product: ProductSchema.optional(),
  ingredientId: z.string().optional(),
  ingredient: IngredientSchema.optional(),
});

export const ExecutionTypeSchema = z.enum(['batch', 'continuous']);

export const ProcessStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum([
    'preparation',
    'production',
    'quality_check',
    'packaging',
    'shipping',
    'custom',
  ]),
  executionType: ExecutionTypeSchema,
  estimatedDuration: z.number().optional(),
  durationUnit: z.enum(['minutes', 'hours', 'days']).optional(),
  assignee: z.string().optional(),
  notes: z.string().optional(),
  ingredients: z.array(SelectedIngredientSchema).optional(),
  outputVariables: z.array(OutputVariableSchema).optional(),
  providerIds: z.array(z.string()).optional(),
  order: z.number(),
});

export const ProcessPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);
export const ProcessStatusSchema = z.enum(['draft', 'active', 'completed']);

export const ProcessSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  productId: z.string().optional(),
  priority: ProcessPrioritySchema,
  steps: z.array(ProcessStepSchema),
  status: ProcessStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProcessStep = z.infer<typeof ProcessStepSchema>;
export type Process = z.infer<typeof ProcessSchema>;
export type ProcessPriority = z.infer<typeof ProcessPrioritySchema>;
export type ProcessStatus = z.infer<typeof ProcessStatusSchema>;
export type ExecutionType = z.infer<typeof ExecutionTypeSchema>;
export type OutputVariable = z.infer<typeof OutputVariableSchema>;
export type OutputVariableType = z.infer<typeof OutputVariableTypeSchema>;
export type ModalStep = 'type' | 'details' | 'timing' | 'variables' | 'review';

export type StepType = ProcessStep['type'];
export type DurationUnit = NonNullable<ProcessStep['durationUnit']>;

export const STEP_TYPE_LABELS: Record<StepType, string> = {
  preparation: 'Preparation',
  production: 'Production',
  quality_check: 'Quality Check',
  packaging: 'Packaging',
  shipping: 'Shipping',
  custom: 'Custom',
};

export const DURATION_UNITS: DurationUnit[] = ['minutes', 'hours', 'days'];

export const MODAL_STEPS: ModalStep[] = ['type', 'details', 'timing', 'variables', 'review'];

export const STEP_TYPES: {
  label: string;
  description: string;
  value: StepType;
}[] = [
  {
    label: 'Preparación',
    description: 'Acciones preliminares y de configuración',
    value: 'preparation',
  },
  {
    label: 'Producción',
    description: 'Fabricación o transformación del producto',
    value: 'production',
  },
  {
    label: 'Control de Calidad',
    description: 'Aseguramiento y verificación de la calidad',
    value: 'quality_check',
  },
  {
    label: 'Empaque',
    description: 'Operaciones de empaque de productos',
    value: 'packaging',
  },
  {
    label: 'Envío',
    description: 'Envío y logística',
    value: 'shipping',
  },
  {
    label: 'Personalizado',
    description: 'Define tu propio paso personalizado',
    value: 'custom',
  },
];

export const DURATION_UNIT_LABELS: Record<DurationUnit, string> = {
  minutes: 'Minutos',
  hours: 'Horas',
  days: 'Días',
};

export const OUTPUT_VARIABLE_TYPE_LABELS: Record<OutputVariableType, string> = {
  name: 'Custom Name',
  product: 'Product',
  ingredient: 'Ingredient',
};

export const PROCESS_PRIORITY_LABELS: Record<ProcessPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export const PROCESS_STATUS_LABELS: Record<ProcessStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
};

export const PROCESS_PRIORITIES: ProcessPriority[] = ['low', 'medium', 'high', 'urgent'];
export const PROCESS_STATUSES: ProcessStatus[] = ['draft', 'active', 'completed'];

export const EXECUTION_TYPE_LABELS: Record<ExecutionType, string> = {
  batch: 'Batch',
  continuous: 'Continuous',
};

export const EXECUTION_TYPES: ExecutionType[] = ['batch', 'continuous'];
