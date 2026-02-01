import { api } from '@/src/libs/api';
import { IngredientsResponse, IngredientsResponseSchema } from '../types';

export interface GetIngredientsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getIngredients(
  params: GetIngredientsParams = {}
): Promise<IngredientsResponse> {
  const { page = 1, pageSize = 10, search } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    searchParams.set('search', search);
  }

  const { data, response } = await api.get<IngredientsResponse>({
    url: `/ingredients?${searchParams.toString()}`,
    schema: IngredientsResponseSchema,
  });

  if (!response.ok || !data) {
    throw new Error('Failed to fetch ingredients');
  }

  return data;
}
