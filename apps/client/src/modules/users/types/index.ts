import { z } from 'zod';
import { RoleSchema } from '@/src/modules/auth/types';

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive']),
  roles: z.array(RoleSchema).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserListSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
export type UserList = z.infer<typeof UserListSchema>;

export interface ProductsResponse {
  data: UserList;
  total: number;
  page: number;
  pageSize: number;
}

export const ProductsResponseSchema = z.object({
  data: UserListSchema,
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
