import { api } from '@/src/libs/api';
import { ProvidersResponse, ProvidersResponseSchema } from '../types';

export interface GetProvidersParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getProviders(
  params: GetProvidersParams = {}
): Promise<ProvidersResponse> {
  const { page = 1, pageSize = 10, search } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    searchParams.set('search', search);
  }

  const { data, response } = await api.get<ProvidersResponse>({
    url: `/providers?${searchParams.toString()}`,
    schema: ProvidersResponseSchema,
  });

  if (!response.ok || !data) {
    throw new Error('Failed to fetch providers');
  }

  return data;
}
