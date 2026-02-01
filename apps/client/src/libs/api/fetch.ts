import { z } from 'zod';
import { FetchInput, FetchOutput } from './types';

export const fetchWrapper = async <DataType>({
  url: _url,
  schema = z.any() as z.ZodType<DataType>,
  options = {},
}: FetchInput<DataType>): Promise<FetchOutput<DataType>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${_url}`;

  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, { ...options });
  if (response.status === 504) {
    return { success: false, response, error: 'Gateway Timeout' };
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return { success: true, response, data: null };
  }

  try {
    const data = await response?.json();
    const parsedData = schema.parse(data);
    console.log(parsedData);
    if (response.status === 500) {
      return { success: false, response, error: data.error };
    }
    return { success: true, response, data: parsedData };
  } catch (error) {
    console.log(error);
    return { success: false, response, error: 'Error' };
  }
};
