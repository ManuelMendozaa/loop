import { api } from '@/src/libs/api';
import { ProductsResponse, ProductsResponseSchema } from '../types';

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<ProductsResponse> {
  const { page = 1, pageSize = 10, search } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    searchParams.set('search', search);
  }

  const { data, response } = await api.get<ProductsResponse>({
    url: `/products?${searchParams.toString()}`,
    schema: ProductsResponseSchema,
  });

  if (!response.ok || !data) {
    throw new Error('Failed to fetch products');
  }

  return data;
}
