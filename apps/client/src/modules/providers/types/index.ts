import { z } from 'zod';

export const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  type: z.enum(['manufacturer', 'distributor', 'wholesaler', 'logistics']),
  status: z.enum(['active', 'inactive', 'pending']),
  rating: z.number().min(0).max(5).optional(),
  ingredientsCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProviderListSchema = z.array(ProviderSchema);

export type Provider = z.infer<typeof ProviderSchema>;
export type ProviderList = z.infer<typeof ProviderListSchema>;

export interface ProvidersResponse {
  data: ProviderList;
  total: number;
  page: number;
  pageSize: number;
}

export const ProvidersResponseSchema = z.object({
  data: ProviderListSchema,
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const PROVIDER_STATUS_LABELS: Record<Provider['status'], string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
};

export const PROVIDER_TYPE_LABELS: Record<Provider['type'], string> = {
  manufacturer: 'Manufacturer',
  distributor: 'Distributor',
  wholesaler: 'Wholesaler',
  logistics: 'Logistics',
};

// Dummy data for development
export const DUMMY_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Pepe',
    email: 'pepe@loop.com',
    phone: '+1 555-0201',
    address: '100 Industrial Park',
    city: 'Chicago',
    country: 'USA',
    type: 'manufacturer',
    status: 'active',
    rating: 4.8,
    ingredientsCount: 125,
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'Eugenia',
    email: 'eugenia@loop.com',
    phone: '+1 555-0201',
    address: '100 Industrial Park',
    city: 'Chicago',
    country: 'USA',
    type: 'manufacturer',
    status: 'active',
    rating: 4.8,
    ingredientsCount: 125,
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Nicola',
    email: 'nicola@loop.com',
    phone: '+1 555-0201',
    address: '100 Industrial Park',
    city: 'Chicago',
    country: 'USA',
    type: 'manufacturer',
    status: 'active',
    rating: 4.8,
    ingredientsCount: 125,
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '4',
    name: 'Esmmaltadores Unidos Anónimos',
    email: 'esmmaltadores@loop.com',
    phone: '+1 555-0201',
    address: '100 Industrial Park',
    city: 'Chicago',
    country: 'USA',
    type: 'manufacturer',
    status: 'active',
    rating: 4.8,
    ingredientsCount: 125,
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '5',
    name: 'Esmaltes Dinamarca',
    email: 'esdina@loop.com',
    phone: '+1 555-0201',
    address: '100 Industrial Park',
    city: 'Chicago',
    country: 'USA',
    type: 'manufacturer',
    status: 'active',
    rating: 4.8,
    ingredientsCount: 125,
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
];
