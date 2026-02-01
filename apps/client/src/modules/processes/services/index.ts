import { api } from '@/src/libs/api';
import { ProcessesResponse, ProcessesResponseSchema } from '../types';

export interface GetProcessesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
}

export async function getProcesses(
  params: GetProcessesParams = {}
): Promise<ProcessesResponse> {
  const { page = 1, pageSize = 10, search, status } = params;

  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search) {
    searchParams.set('search', search);
  }

  if (status) {
    searchParams.set('status', status);
  }

  const { data, response } = await api.get<ProcessesResponse>({
    url: `/processes?${searchParams.toString()}`,
    schema: ProcessesResponseSchema,
  });

  if (!response.ok || !data) {
    throw new Error('Failed to fetch processes');
  }

  return data;
}
