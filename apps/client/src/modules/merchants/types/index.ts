import { z } from 'zod';

export const MerchantSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
  productsCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const MerchantListSchema = z.array(MerchantSchema);

export type Merchant = z.infer<typeof MerchantSchema>;
export type MerchantList = z.infer<typeof MerchantListSchema>;

export interface MerchantsResponse {
  data: MerchantList;
  total: number;
  page: number;
  pageSize: number;
}

export const MerchantsResponseSchema = z.object({
  data: MerchantListSchema,
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const MERCHANT_STATUS_LABELS: Record<Merchant['status'], string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
};

// Dummy data for development
export const DUMMY_MERCHANTS: Merchant[] = [
  {
    id: '1',
    name: 'Fresh Foods Co.',
    email: 'contact@freshfoods.com',
    phone: '+1 555-0101',
    address: '123 Market Street',
    city: 'San Francisco',
    country: 'USA',
    status: 'active',
    productsCount: 45,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'Organic Valley',
    email: 'info@organicvalley.com',
    phone: '+1 555-0102',
    address: '456 Farm Road',
    city: 'Portland',
    country: 'USA',
    status: 'active',
    productsCount: 32,
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
  {
    id: '3',
    name: 'Green Grocers Ltd',
    email: 'sales@greengrocers.co.uk',
    phone: '+44 20 7946 0958',
    address: '78 High Street',
    city: 'London',
    country: 'UK',
    status: 'active',
    productsCount: 28,
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-19T16:45:00Z',
  },
  {
    id: '4',
    name: 'Pacific Traders',
    email: 'hello@pacifictraders.com',
    phone: '+1 555-0104',
    address: '890 Harbor Blvd',
    city: 'Los Angeles',
    country: 'USA',
    status: 'pending',
    productsCount: 0,
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-15T14:00:00Z',
  },
  {
    id: '5',
    name: 'Euro Supplies',
    email: 'contact@eurosupplies.eu',
    phone: '+49 30 12345678',
    address: '12 Hauptstraße',
    city: 'Berlin',
    country: 'Germany',
    status: 'active',
    productsCount: 67,
    createdAt: '2024-01-03T11:20:00Z',
    updatedAt: '2024-01-21T09:30:00Z',
  },
  {
    id: '6',
    name: 'Asian Imports Inc',
    email: 'orders@asianimports.com',
    phone: '+1 555-0106',
    address: '234 Commerce Way',
    city: 'Seattle',
    country: 'USA',
    status: 'inactive',
    productsCount: 15,
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '7',
    name: 'Local Harvest',
    email: 'farm@localharvest.com',
    phone: '+1 555-0107',
    address: '567 Rural Route',
    city: 'Austin',
    country: 'USA',
    status: 'active',
    productsCount: 23,
    createdAt: '2024-01-12T13:45:00Z',
    updatedAt: '2024-01-22T10:15:00Z',
  },
  {
    id: '8',
    name: 'Mediterranean Foods',
    email: 'info@medfoods.es',
    phone: '+34 91 123 4567',
    address: '45 Calle Mayor',
    city: 'Madrid',
    country: 'Spain',
    status: 'pending',
    productsCount: 0,
    createdAt: '2024-01-18T16:30:00Z',
    updatedAt: '2024-01-18T16:30:00Z',
  },
];
