import { z } from 'zod';
import { FetchInput } from './types';
import { fetchWrapper } from './fetch';
import { getFetchHeaders } from './headers';

export const api = {
  get: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: FetchInput<DataType>) =>
    fetchWrapper({
      url,
      schema,
      options: {
        ...options,
        method: 'GET',
        headers: getFetchHeaders(options.headers),
      },
    }),

  post: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: FetchInput<DataType>) =>
    fetchWrapper({
      url,
      schema,
      options: {
        ...options,
        method: 'POST',
        headers: {
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...getFetchHeaders(options.headers),
        },
      },
    }),

  put: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: FetchInput<DataType>) =>
    fetchWrapper({
      url,
      schema,
      options: {
        ...options,
        method: 'PUT',
        headers: {
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...getFetchHeaders(options.headers),
        },
      },
    }),

  delete: async <DataType>({
    url,
    schema = z.any() as z.ZodType<DataType>,
    options = {},
  }: FetchInput<DataType>) =>
    fetchWrapper({
      url,
      schema,
      options: {
        ...options,
        method: 'DELETE',
        headers: {
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...getFetchHeaders(options.headers),
        },
      },
    }),
};

export * from './types';
export * from './hooks';
