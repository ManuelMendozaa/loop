import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  category: z.string(),
  price: z.number(),
  provider: z.string(),
  stock: z.number(),
  status: z.enum(['active', 'inactive', 'out_of_stock']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ProductListSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;

export interface ProductsResponse {
  data: ProductList;
  total: number;
  page: number;
  pageSize: number;
}

export const ProductsResponseSchema = z.object({
  data: ProductListSchema,
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
