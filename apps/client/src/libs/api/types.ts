import { z } from 'zod';
import { UseQueryOptions } from '@tanstack/react-query';

export type TFetchInput<DataType> = {
  url: string;
  schema?: z.ZodType<DataType>;
  options?: RequestInit;
};

export type TFetchOutput<DataType> = {
  response: Response;
  data: DataType;
};

export type QueryOptions<DataType> = UseQueryOptions<
  any,
  any,
  TFetchOutput<DataType>,
  any
>;
