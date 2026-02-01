import { api } from '@/src/libs/api';
import { MerchantsResponse, MerchantsResponseSchema } from '../types';

export interface GetMerchantsParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getMerchants(
  params: GetMerchantsParams = {}
): Promise<MerchantsResponse> {
  const { page = 1, pageSize = 10, search } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    searchParams.set('search', search);
  }

  const { data, response } = await api.get<MerchantsResponse>({
    url: `/merchants?${searchParams.toString()}`,
    schema: MerchantsResponseSchema,
  });

  if (!response.ok || !data) {
    throw new Error('Failed to fetch merchants');
  }

  return data;
}
