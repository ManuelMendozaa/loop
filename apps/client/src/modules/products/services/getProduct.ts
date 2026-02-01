import { api } from '@/src/libs/api';
import { Product, ProductSchema } from '../types';

export async function getProduct(id: string): Promise<Product> {
  const { data, response } = await api.get<Product>({
    url: `/products/${id}`,
    schema: ProductSchema,
  });

  if (!response.ok || !data) {
    throw new Error('Failed to fetch product');
  }

  return data;
}
