import {
  QueryClient,
  UseMutationOptions,
  useMutation as useReactMutation,
  useQuery as useReactQuery,
} from '@tanstack/react-query';
import { FetchError, QueryOptions } from './types';

export function useMutation<FetchInput, FetchOutput>(
  options: UseMutationOptions<FetchOutput, FetchError, FetchInput, unknown>,
  queryClient?: QueryClient
) {
  return useReactMutation<FetchOutput, FetchError, FetchInput>(
    options,
    queryClient
  );
}

export function useQuery<FetchInput, FetchOutput>(
  options: QueryOptions<FetchInput, FetchOutput>
) {
  return useReactQuery(options);
}
