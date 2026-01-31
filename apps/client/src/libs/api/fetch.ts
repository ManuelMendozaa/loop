import { z } from 'zod';
import { TFetchInput, TFetchOutput } from './types';

export const fetchWrapper = async <DataType>({
  url: _url,
  schema = z.any() as z.ZodType<DataType>,
  options = {},
}: TFetchInput<DataType>): Promise<TFetchOutput<DataType | null>> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${_url}`;

  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, { ...options });
  if (response.status === 504) return { response, data: null };

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return { response, data: null };
  }

  try {
    const data = await response?.json();
    const parsedData = schema.parse(data);
    return { response, data: parsedData };
  } catch (error) {
    throw new Error(`Invalid response structure: ${error}`);
  }
};
