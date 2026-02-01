import { z } from 'zod';
import { SelectedIngredientSchema } from '@/src/modules/ingredients/types';

export const ProcessStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum([
    'preparation',
    'quality_check',
    'packaging',
    'shipping',
    'custom',
  ]),
  estimatedDuration: z.number().optional(),
  durationUnit: z.enum(['minutes', 'hours', 'days']).optional(),
  assignee: z.string().optional(),
  notes: z.string().optional(),
  ingredients: z.array(SelectedIngredientSchema).optional(),
  order: z.number(),
});

export const ProcessSchema = z.object({
  id: z.string(),
  productId: z.string(),
  steps: z.array(ProcessStepSchema),
  status: z.enum(['draft', 'active', 'completed']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProcessStep = z.infer<typeof ProcessStepSchema>;
export type Process = z.infer<typeof ProcessSchema>;
export type ModalStep = 'type' | 'details' | 'timing' | 'review';

export type StepType = ProcessStep['type'];
export type DurationUnit = NonNullable<ProcessStep['durationUnit']>;

export const STEP_TYPE_LABELS: Record<StepType, string> = {
  preparation: 'Preparation',
  quality_check: 'Quality Check',
  packaging: 'Packaging',
  shipping: 'Shipping',
  custom: 'Custom',
};

export const DURATION_UNITS: DurationUnit[] = ['minutes', 'hours', 'days'];

export const MODAL_STEPS: ModalStep[] = ['type', 'details', 'timing', 'review'];

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
