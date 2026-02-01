import { z } from 'zod';

export * from './workflow';

export const ProcessStatusSchema = z.enum(['draft', 'active', 'archived']);
export const ProcessPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

export const ProcessSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  stepsCount: z.number(),
  priority: ProcessPrioritySchema,
  status: ProcessStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProcessListSchema = z.array(ProcessSchema);

export type ProcessStatus = z.infer<typeof ProcessStatusSchema>;
export type ProcessPriority = z.infer<typeof ProcessPrioritySchema>;
export type Process = z.infer<typeof ProcessSchema>;
export type ProcessList = z.infer<typeof ProcessListSchema>;

export interface ProcessesResponse {
  data: ProcessList;
  total: number;
  page: number;
  pageSize: number;
}

export const ProcessesResponseSchema = z.object({
  data: ProcessListSchema,
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const PROCESS_STATUS_LABELS: Record<ProcessStatus, string> = {
  draft: 'Borrador',
  active: 'Activo',
  archived: 'Archivado',
};

export const PROCESS_PRIORITY_LABELS: Record<ProcessPriority, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  urgent: 'Urgente',
};

// Dummy data for development
export const DUMMY_PROCESSES: Process[] = [
  {
    id: 'proc-1',
    name: 'Tostado de Café',
    description: 'Proceso estándar para tostar granos de café arábica premium',
    stepsCount: 5,
    priority: 'high',
    status: 'active',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: 'proc-2',
    name: 'Mezcla de Té Verde',
    description: 'Preparación y mezcla de té verde premium con hierbas',
    stepsCount: 4,
    priority: 'medium',
    status: 'active',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-18T11:20:00Z',
  },
  {
    id: 'proc-3',
    name: 'Producción de Mantequilla de Almendra',
    description: 'Proceso completo para elaborar mantequilla de almendra orgánica',
    stepsCount: 6,
    priority: 'medium',
    status: 'active',
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-22T09:00:00Z',
  },
  {
    id: 'proc-4',
    name: 'Empaque de Quinoa',
    description: 'Empaque a granel de quinoa para distribución minorista',
    stepsCount: 3,
    priority: 'low',
    status: 'active',
    createdAt: '2024-01-08T13:45:00Z',
    updatedAt: '2024-01-19T10:30:00Z',
  },
  {
    id: 'proc-5',
    name: 'Filtrado de Miel',
    description: 'Filtración y embotellado de miel cruda sin procesar',
    stepsCount: 4,
    priority: 'high',
    status: 'draft',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-22T15:30:00Z',
  },
  {
    id: 'proc-6',
    name: 'Templado de Chocolate',
    description: 'Proceso de templado para chocolate artesanal',
    stepsCount: 7,
    priority: 'urgent',
    status: 'draft',
    createdAt: '2024-01-22T16:00:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
  },
  {
    id: 'proc-7',
    name: 'Limpieza de Semillas de Chía',
    description: 'Limpieza y control de calidad de semillas de chía',
    stepsCount: 3,
    priority: 'low',
    status: 'archived',
    createdAt: '2023-12-01T09:00:00Z',
    updatedAt: '2024-01-05T11:00:00Z',
  },
];
