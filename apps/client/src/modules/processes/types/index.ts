import { z } from 'zod';
import { ProductSchema } from '@/src/modules/products/types';

export const ProcessStatusSchema = z.enum(['draft', 'active', 'in_progress', 'completed', 'cancelled']);

export const ProcessSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  productId: z.string(),
  product: ProductSchema.optional(),
  stepsCount: z.number(),
  completedSteps: z.number(),
  status: ProcessStatusSchema,
  assignee: z.string().optional(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProcessListSchema = z.array(ProcessSchema);

export type ProcessStatus = z.infer<typeof ProcessStatusSchema>;
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
  draft: 'Draft',
  active: 'Active',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

// Dummy data for development
export const DUMMY_PROCESSES: Process[] = [
  {
    id: 'proc-1',
    name: 'Coffee Roasting Batch #1042',
    description: 'Premium arabica roasting process',
    productId: '1',
    product: {
      id: '1',
      name: 'Organic Coffee Beans',
      sku: 'COF-001',
      category: 'Beverages',
      price: 24.99,
      stock: 150,
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
    },
    stepsCount: 5,
    completedSteps: 5,
    status: 'completed',
    assignee: 'John Smith',
    startedAt: '2024-01-18T08:00:00Z',
    completedAt: '2024-01-18T14:30:00Z',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
  },
  {
    id: 'proc-2',
    name: 'Tea Blending Process #872',
    description: 'Green tea premium blend preparation',
    productId: '2',
    product: {
      id: '2',
      name: 'Green Tea Premium',
      sku: 'TEA-002',
      category: 'Beverages',
      price: 18.5,
      stock: 89,
      status: 'active',
      createdAt: '2024-01-12T08:00:00Z',
      updatedAt: '2024-01-18T11:20:00Z',
    },
    stepsCount: 4,
    completedSteps: 2,
    status: 'in_progress',
    assignee: 'Maria Garcia',
    startedAt: '2024-01-22T09:00:00Z',
    createdAt: '2024-01-21T16:00:00Z',
    updatedAt: '2024-01-22T11:45:00Z',
  },
  {
    id: 'proc-3',
    name: 'Almond Butter Production #445',
    productId: '3',
    stepsCount: 6,
    completedSteps: 0,
    status: 'active',
    createdAt: '2024-01-22T14:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
  },
  {
    id: 'proc-4',
    name: 'Quinoa Packaging Run #1201',
    description: 'Bulk quinoa packaging for retail',
    productId: '4',
    product: {
      id: '4',
      name: 'Quinoa Organic',
      sku: 'GRN-004',
      category: 'Grains',
      price: 8.99,
      stock: 200,
      status: 'active',
      createdAt: '2024-01-08T13:45:00Z',
      updatedAt: '2024-01-19T10:30:00Z',
    },
    stepsCount: 3,
    completedSteps: 3,
    status: 'completed',
    assignee: 'David Lee',
    startedAt: '2024-01-20T07:00:00Z',
    completedAt: '2024-01-20T12:00:00Z',
    createdAt: '2024-01-19T15:30:00Z',
    updatedAt: '2024-01-20T12:00:00Z',
  },
  {
    id: 'proc-5',
    name: 'Honey Filtering Batch #89',
    description: 'Raw honey filtration and bottling',
    productId: '6',
    product: {
      id: '6',
      name: 'Honey Raw Unfiltered',
      sku: 'SWT-006',
      category: 'Sweeteners',
      price: 22.0,
      stock: 12,
      status: 'active',
      createdAt: '2024-01-03T11:00:00Z',
      updatedAt: '2024-01-17T15:30:00Z',
    },
    stepsCount: 4,
    completedSteps: 1,
    status: 'in_progress',
    assignee: 'Sarah Johnson',
    startedAt: '2024-01-22T13:00:00Z',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T15:30:00Z',
  },
  {
    id: 'proc-6',
    name: 'Chocolate Tempering #234',
    productId: '7',
    stepsCount: 5,
    completedSteps: 0,
    status: 'draft',
    createdAt: '2024-01-22T16:00:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
  },
  {
    id: 'proc-7',
    name: 'Chia Seed Cleaning #567',
    description: 'Chia seeds cleaning and quality check',
    productId: '8',
    product: {
      id: '8',
      name: 'Chia Seeds',
      sku: 'SED-008',
      category: 'Seeds',
      price: 9.25,
      stock: 180,
      status: 'active',
      createdAt: '2023-12-20T10:00:00Z',
      updatedAt: '2024-01-20T12:15:00Z',
    },
    stepsCount: 3,
    completedSteps: 0,
    status: 'cancelled',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-16T11:00:00Z',
  },
  {
    id: 'proc-8',
    name: 'Coffee Roasting Batch #1043',
    description: 'Second batch of premium arabica',
    productId: '1',
    product: {
      id: '1',
      name: 'Organic Coffee Beans',
      sku: 'COF-001',
      category: 'Beverages',
      price: 24.99,
      stock: 150,
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
    },
    stepsCount: 5,
    completedSteps: 3,
    status: 'in_progress',
    assignee: 'John Smith',
    startedAt: '2024-01-22T08:00:00Z',
    createdAt: '2024-01-21T17:00:00Z',
    updatedAt: '2024-01-22T14:00:00Z',
  },
];
