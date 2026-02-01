import { z } from 'zod';
import {
  ChefHat,
  Factory,
  ClipboardCheck,
  Package,
  Truck,
  Settings,
  LucideIcon,
} from 'lucide-react';
import {
  SelectedIngredientSchema,
  MetricUnitSchema,
  IngredientSchema,
} from '@/src/modules/ingredients/types';
import { ProductSchema } from '@/src/modules/products/types';
import { DURATION_UNITS_VALUES, DurationUnitEnum } from '@/src/utils/time';

export const OutputVariableTypeSchema = z.enum([
  'name',
  'product',
  'ingredient',
]);

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
export const StepTypeSchema = z.enum([
  'preparation',
  'production',
  'quality_check',
  'packaging',
  'shipping',
  'custom',
]);

export const ProcessStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: StepTypeSchema,
  executionType: ExecutionTypeSchema,
  estimatedDuration: z.number().optional(),
  durationUnit: z.enum(DURATION_UNITS_VALUES).optional(),
  assignee: z.string().optional(),
  notes: z.string().optional(),
  ingredients: z.array(SelectedIngredientSchema).optional(),
  outputVariables: z.array(OutputVariableSchema).optional(),
  providerIds: z.array(z.string()).optional(),
  order: z.number(),
});

export const ProcessPrioritySchema = z.enum([
  'low',
  'medium',
  'high',
  'urgent',
]);
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

export type StepTypeEnum = z.infer<typeof StepTypeSchema>;

export const STEP_TYPE_LABELS: Record<StepTypeEnum, string> = {
  preparation: 'Preparation',
  production: 'Production',
  quality_check: 'Quality Check',
  packaging: 'Packaging',
  shipping: 'Shipping',
  custom: 'Custom',
};

export const MODAL_STEPS: ModalStep[] = [
  'type',
  'details',
  'timing',
  'variables',
  'review',
];

export interface StepType {
  label: string;
  description: string;
  value: StepTypeEnum;
  icon: LucideIcon;
}

export const STEP_TYPES: StepType[] = [
  {
    label: 'Preparación',
    description: 'Acciones preliminares y de configuración',
    value: 'preparation',
    icon: ChefHat,
  },
  {
    label: 'Producción',
    description: 'Fabricación o transformación del producto',
    value: 'production',
    icon: Factory,
  },
  {
    label: 'Control de Calidad',
    description: 'Aseguramiento y verificación de la calidad',
    value: 'quality_check',
    icon: ClipboardCheck,
  },
  {
    label: 'Empaque',
    description: 'Operaciones de empaque de productos',
    value: 'packaging',
    icon: Package,
  },
  {
    label: 'Envío',
    description: 'Envío y logística',
    value: 'shipping',
    icon: Truck,
  },
  {
    label: 'Personalizado',
    description: 'Define tu propio paso personalizado',
    value: 'custom',
    icon: Settings,
  },
];

export const DURATION_UNIT_LABELS: Record<DurationUnitEnum, string> = {
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

export const PROCESS_PRIORITIES: ProcessPriority[] = [
  'low',
  'medium',
  'high',
  'urgent',
];
export const PROCESS_STATUSES: ProcessStatus[] = [
  'draft',
  'active',
  'completed',
];

export const EXECUTION_TYPE_LABELS: Record<ExecutionType, string> = {
  batch: 'Batch',
  continuous: 'Continuous',
};

export const EXECUTION_TYPES: ExecutionType[] = ['batch', 'continuous'];

export const PRIORITY_VARIANTS: Record<
  ProcessPriority,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  low: 'outline',
  medium: 'secondary',
  high: 'default',
  urgent: 'destructive',
};

// Dummy data for process details (with steps)
export const DUMMY_PROCESS_DETAILS: Process[] = [
  {
    id: 'proc-1',
    name: 'Tostado de Café',
    description: 'Proceso estándar para tostar granos de café arábica premium',
    priority: 'high',
    status: 'active',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    steps: [
      {
        id: 'step-1',
        name: 'Selección de granos',
        description: 'Seleccionar y clasificar los granos de café por tamaño y calidad',
        type: 'preparation',
        executionType: 'batch',
        estimatedDuration: 30,
        durationUnit: 'minutes',
        order: 1,
        ingredients: [
          {
            ingredientId: '1',
            ingredient: {
              id: '1',
              name: 'Granos de Café Arábica',
              description: 'Granos de café verde sin tostar',
              metricUnit: 'kg',
              stock: 100,
              minStock: 20,
              createdAt: '2024-01-10T10:00:00Z',
              updatedAt: '2024-01-20T14:00:00Z',
            },
            amount: 10,
          },
          {
            ingredientId: '2',
            ingredient: {
              id: '2',
              name: 'Granos de Café Robusta',
              description: 'Granos de café verde para mezcla',
              metricUnit: 'kg',
              stock: 50,
              minStock: 10,
              createdAt: '2024-01-10T10:00:00Z',
              updatedAt: '2024-01-20T14:00:00Z',
            },
            amount: 5,
          },
        ],
      },
      {
        id: 'step-2',
        name: 'Precalentamiento del tostador',
        description: 'Calentar el tostador a la temperatura óptima de 200°C',
        type: 'preparation',
        executionType: 'batch',
        estimatedDuration: 15,
        durationUnit: 'minutes',
        order: 2,
      },
      {
        id: 'step-3',
        name: 'Tostado',
        description: 'Tostar los granos hasta alcanzar el perfil deseado',
        type: 'production',
        executionType: 'batch',
        estimatedDuration: 12,
        durationUnit: 'minutes',
        order: 3,
      },
      {
        id: 'step-4',
        name: 'Enfriamiento',
        description: 'Enfriar rápidamente los granos para detener el proceso de tostado',
        type: 'production',
        executionType: 'batch',
        estimatedDuration: 5,
        durationUnit: 'minutes',
        order: 4,
      },
      {
        id: 'step-5',
        name: 'Control de calidad',
        description: 'Verificar color, aroma y prueba de taza',
        type: 'quality_check',
        executionType: 'batch',
        estimatedDuration: 20,
        durationUnit: 'minutes',
        order: 5,
      },
    ],
  },
  {
    id: 'proc-2',
    name: 'Mezcla de Té Verde',
    description: 'Preparación y mezcla de té verde premium con hierbas',
    priority: 'medium',
    status: 'active',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
    steps: [
      {
        id: 'step-1',
        name: 'Preparación de ingredientes',
        description: 'Pesar y preparar el té verde y las hierbas aromáticas',
        type: 'preparation',
        executionType: 'batch',
        estimatedDuration: 20,
        durationUnit: 'minutes',
        order: 1,
      },
      {
        id: 'step-2',
        name: 'Mezcla',
        description: 'Combinar los ingredientes en las proporciones correctas',
        type: 'production',
        executionType: 'batch',
        estimatedDuration: 15,
        durationUnit: 'minutes',
        order: 2,
      },
      {
        id: 'step-3',
        name: 'Inspección visual',
        description: 'Verificar la uniformidad de la mezcla',
        type: 'quality_check',
        executionType: 'batch',
        estimatedDuration: 10,
        durationUnit: 'minutes',
        order: 3,
      },
      {
        id: 'step-4',
        name: 'Empaque',
        description: 'Empacar la mezcla en bolsas selladas',
        type: 'packaging',
        executionType: 'batch',
        estimatedDuration: 25,
        durationUnit: 'minutes',
        order: 4,
      },
    ],
  },
  {
    id: 'proc-3',
    name: 'Producción de Mantequilla de Almendra',
    description: 'Proceso completo para elaborar mantequilla de almendra orgánica',
    priority: 'medium',
    status: 'active',
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
    steps: [
      {
        id: 'step-1',
        name: 'Lavado de almendras',
        description: 'Lavar y secar las almendras crudas',
        type: 'preparation',
        executionType: 'batch',
        estimatedDuration: 15,
        durationUnit: 'minutes',
        order: 1,
      },
      {
        id: 'step-2',
        name: 'Tostado',
        description: 'Tostar las almendras a 160°C',
        type: 'production',
        executionType: 'batch',
        estimatedDuration: 20,
        durationUnit: 'minutes',
        order: 2,
      },
      {
        id: 'step-3',
        name: 'Molienda inicial',
        description: 'Primera pasada en el procesador de alimentos',
        type: 'production',
        executionType: 'continuous',
        estimatedDuration: 10,
        durationUnit: 'minutes',
        order: 3,
      },
      {
        id: 'step-4',
        name: 'Molienda fina',
        description: 'Segunda pasada hasta obtener textura cremosa',
        type: 'production',
        executionType: 'continuous',
        estimatedDuration: 15,
        durationUnit: 'minutes',
        order: 4,
      },
      {
        id: 'step-5',
        name: 'Control de textura',
        description: 'Verificar consistencia y sabor',
        type: 'quality_check',
        executionType: 'batch',
        estimatedDuration: 10,
        durationUnit: 'minutes',
        order: 5,
      },
      {
        id: 'step-6',
        name: 'Envasado',
        description: 'Envasar en frascos de vidrio esterilizados',
        type: 'packaging',
        executionType: 'batch',
        estimatedDuration: 30,
        durationUnit: 'minutes',
        order: 6,
      },
    ],
  },
];
