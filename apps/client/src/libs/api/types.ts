/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from 'zod';
import { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type FetchError = AxiosError;

export type FetchInput<DataType> = {
  url: string;
  schema?: z.ZodType<DataType>;
  options?: RequestInit;
};

export type FetchOutput<DataType> =
  | { success: true; response: Response; data: DataType | null }
  | { success: false; response: Response; error: string };

export type QueryOptions<InputType, OutputType> = UseQueryOptions<
  InputType,
  FetchError,
  FetchOutput<OutputType>,
  any
>;
