import { z } from 'zod';
import { StepTypeSchema } from './process';

export const WorkflowStatusSchema = z.enum([
  'pending',
  'in_progress',
  'completed',
  'cancelled',
]);

export const WorkflowStepStatusSchema = z.enum([
  'pending',
  'in_progress',
  'completed',
]);

export const StepVariableSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  unit: z.string(),
});

export const StepProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const WorkflowStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: StepTypeSchema,
  status: WorkflowStepStatusSchema,
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  inputVariables: z.array(StepVariableSchema).optional(),
  outputVariables: z.array(StepVariableSchema).optional(),
  providers: z.array(StepProviderSchema).optional(),
  order: z.number(),
});

export const WorkflowPaymentSchema = z.object({
  id: z.string(),
  stepId: z.string(),
  stepName: z.string(),
  providerId: z.string(),
  providerName: z.string(),
  amount: z.number(),
  createdAt: z.string(),
});

export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  processId: z.string(),
  processName: z.string(),
  stepsCount: z.number(),
  completedSteps: z.number(),
  status: WorkflowStatusSchema,
  assignee: z.string().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const WorkflowDetailSchema = WorkflowSchema.extend({
  steps: z.array(WorkflowStepSchema),
  payments: z.array(WorkflowPaymentSchema),
  totalCost: z.number(),
});

export const WorkflowListSchema = z.array(WorkflowSchema);

export type WorkflowStatus = z.infer<typeof WorkflowStatusSchema>;
export type WorkflowStepStatus = z.infer<typeof WorkflowStepStatusSchema>;
export type StepVariable = z.infer<typeof StepVariableSchema>;
export type StepProvider = z.infer<typeof StepProviderSchema>;
export type WorkflowStep = z.infer<typeof WorkflowStepSchema>;
export type WorkflowPayment = z.infer<typeof WorkflowPaymentSchema>;
export type Workflow = z.infer<typeof WorkflowSchema>;
export type WorkflowDetail = z.infer<typeof WorkflowDetailSchema>;
export type WorkflowList = z.infer<typeof WorkflowListSchema>;

export const WORKFLOW_STATUS_LABELS: Record<WorkflowStatus, string> = {
  pending: 'Pendiente',
  in_progress: 'En Progreso',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

// Dummy data for workflow details
export const DUMMY_WORKFLOW_DETAILS: WorkflowDetail[] = [
  {
    id: 'wf-2',
    name: 'Lote #1043 - Café Premium',
    processId: 'proc-1',
    processName: 'Tostado de Café',
    stepsCount: 5,
    completedSteps: 3,
    status: 'in_progress',
    assignee: 'Juan Pérez',
    startedAt: '2024-01-22T08:00:00Z',
    createdAt: '2024-01-21T17:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
    totalCost: 450.00,
    steps: [
      {
        id: 'ws-1',
        name: 'Selección de granos',
        description: 'Seleccionar y clasificar los granos de café por tamaño y calidad',
        type: 'preparation',
        status: 'completed',
        startedAt: '2024-01-22T08:00:00Z',
        completedAt: '2024-01-22T09:00:00Z',
        inputVariables: [
          { id: 'iv-1', name: 'Granos de Café Arábica', value: 15, unit: 'kg' },
          { id: 'iv-2', name: 'Granos de Café Robusta', value: 5, unit: 'kg' },
        ],
        outputVariables: [
          { id: 'ov-1', name: 'Granos Seleccionados', value: 18.5, unit: 'kg' },
          { id: 'ov-2', name: 'Granos Descartados', value: 1.5, unit: 'kg' },
        ],
        providers: [
          { id: 'prov-1', name: 'Café Importaciones S.A.' },
          { id: 'prov-2', name: 'Granos Premium México' },
        ],
        order: 1,
      },
      {
        id: 'ws-2',
        name: 'Precalentamiento del tostador',
        description: 'Calentar el tostador a la temperatura óptima de 200°C',
        type: 'preparation',
        status: 'completed',
        startedAt: '2024-01-22T09:15:00Z',
        completedAt: '2024-01-22T10:00:00Z',
        outputVariables: [
          { id: 'ov-3', name: 'Temperatura alcanzada', value: 205, unit: '°C' },
        ],
        providers: [
          { id: 'prov-3', name: 'Gas Industrial México' },
        ],
        order: 2,
      },
      {
        id: 'ws-3',
        name: 'Tostado',
        description: 'Tostar los granos hasta alcanzar el perfil deseado',
        type: 'production',
        status: 'completed',
        startedAt: '2024-01-22T10:00:00Z',
        completedAt: '2024-01-22T11:30:00Z',
        inputVariables: [
          { id: 'iv-3', name: 'Granos Seleccionados', value: 18.5, unit: 'kg' },
        ],
        outputVariables: [
          { id: 'ov-4', name: 'Café Tostado', value: 15.2, unit: 'kg' },
          { id: 'ov-5', name: 'Nivel de tueste', value: 85, unit: '%' },
        ],
        providers: [
          { id: 'prov-3', name: 'Gas Industrial México' },
          { id: 'prov-4', name: 'Equipos Tostadores S.A.' },
        ],
        order: 3,
      },
      {
        id: 'ws-4',
        name: 'Enfriamiento',
        description: 'Enfriar rápidamente los granos para detener el proceso de tostado',
        type: 'production',
        status: 'in_progress',
        startedAt: '2024-01-22T11:30:00Z',
        order: 4,
      },
      {
        id: 'ws-5',
        name: 'Control de calidad',
        description: 'Verificar color, aroma y prueba de taza',
        type: 'quality_check',
        status: 'pending',
        order: 5,
      },
    ],
    payments: [
      {
        id: 'pay-1',
        stepId: 'ws-1',
        stepName: 'Selección de granos',
        providerId: 'prov-1',
        providerName: 'Café Importaciones S.A.',
        amount: 350.00,
        createdAt: '2024-01-22T09:00:00Z',
      },
      {
        id: 'pay-2',
        stepId: 'ws-3',
        stepName: 'Tostado',
        providerId: 'prov-2',
        providerName: 'Gas Industrial México',
        amount: 100.00,
        createdAt: '2024-01-22T11:30:00Z',
      },
    ],
  },
  {
    id: 'wf-1',
    name: 'Lote #1042 - Café Arábica',
    processId: 'proc-1',
    processName: 'Tostado de Café',
    stepsCount: 5,
    completedSteps: 5,
    status: 'completed',
    assignee: 'Juan Pérez',
    startedAt: '2024-01-18T08:00:00Z',
    completedAt: '2024-01-18T14:30:00Z',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    totalCost: 520.00,
    steps: [
      {
        id: 'ws-1',
        name: 'Selección de granos',
        description: 'Seleccionar y clasificar los granos de café por tamaño y calidad',
        type: 'preparation',
        status: 'completed',
        completedAt: '2024-01-18T09:00:00Z',
        order: 1,
      },
      {
        id: 'ws-2',
        name: 'Precalentamiento del tostador',
        description: 'Calentar el tostador a la temperatura óptima de 200°C',
        type: 'preparation',
        status: 'completed',
        completedAt: '2024-01-18T09:30:00Z',
        order: 2,
      },
      {
        id: 'ws-3',
        name: 'Tostado',
        description: 'Tostar los granos hasta alcanzar el perfil deseado',
        type: 'production',
        status: 'completed',
        completedAt: '2024-01-18T11:00:00Z',
        order: 3,
      },
      {
        id: 'ws-4',
        name: 'Enfriamiento',
        description: 'Enfriar rápidamente los granos para detener el proceso de tostado',
        type: 'production',
        status: 'completed',
        completedAt: '2024-01-18T12:00:00Z',
        order: 4,
      },
      {
        id: 'ws-5',
        name: 'Control de calidad',
        description: 'Verificar color, aroma y prueba de taza',
        type: 'quality_check',
        status: 'completed',
        completedAt: '2024-01-18T14:30:00Z',
        order: 5,
      },
    ],
    payments: [
      {
        id: 'pay-1',
        stepId: 'ws-1',
        stepName: 'Selección de granos',
        providerId: 'prov-1',
        providerName: 'Café Importaciones S.A.',
        amount: 400.00,
        createdAt: '2024-01-18T09:00:00Z',
      },
      {
        id: 'pay-2',
        stepId: 'ws-3',
        stepName: 'Tostado',
        providerId: 'prov-2',
        providerName: 'Gas Industrial México',
        amount: 120.00,
        createdAt: '2024-01-18T11:00:00Z',
      },
    ],
  },
];

// Dummy data for workflows
export const DUMMY_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Lote #1042 - Café Arábica',
    processId: 'proc-1',
    processName: 'Tostado de Café',
    stepsCount: 5,
    completedSteps: 5,
    status: 'completed',
    assignee: 'Juan Pérez',
    startedAt: '2024-01-18T08:00:00Z',
    completedAt: '2024-01-18T14:30:00Z',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
  },
  {
    id: 'wf-2',
    name: 'Lote #1043 - Café Premium',
    processId: 'proc-1',
    processName: 'Tostado de Café',
    stepsCount: 5,
    completedSteps: 3,
    status: 'in_progress',
    assignee: 'Juan Pérez',
    startedAt: '2024-01-22T08:00:00Z',
    createdAt: '2024-01-21T17:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
  },
  {
    id: 'wf-3',
    name: 'Mezcla Especial #872',
    processId: 'proc-2',
    processName: 'Mezcla de Té Verde',
    stepsCount: 4,
    completedSteps: 2,
    status: 'in_progress',
    assignee: 'María García',
    startedAt: '2024-01-22T09:00:00Z',
    createdAt: '2024-01-21T16:00:00Z',
    updatedAt: '2024-01-22T11:45:00Z',
  },
  {
    id: 'wf-4',
    name: 'Producción Almendra #445',
    processId: 'proc-3',
    processName: 'Producción de Mantequilla de Almendra',
    stepsCount: 6,
    completedSteps: 0,
    status: 'pending',
    createdAt: '2024-01-22T14:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
  },
  {
    id: 'wf-5',
    name: 'Lote #1044 - Café Orgánico',
    processId: 'proc-1',
    processName: 'Tostado de Café',
    stepsCount: 5,
    completedSteps: 5,
    status: 'completed',
    assignee: 'Carlos López',
    startedAt: '2024-01-20T07:00:00Z',
    completedAt: '2024-01-20T12:00:00Z',
    createdAt: '2024-01-19T15:30:00Z',
    updatedAt: '2024-01-20T12:00:00Z',
  },
  {
    id: 'wf-6',
    name: 'Mezcla Premium #873',
    processId: 'proc-2',
    processName: 'Mezcla de Té Verde',
    stepsCount: 4,
    completedSteps: 0,
    status: 'cancelled',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
  },
];
