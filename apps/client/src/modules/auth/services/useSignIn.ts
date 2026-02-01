import { api, FetchOutput, useMutation } from '@/src/libs/api';
import { BASE_URL } from './const';
import { User } from '../../users/types';

type InputType = { email: string; password: string };
type OutputType = FetchOutput<{ user: User; token: string }>;

export function useSignIn() {
  return useMutation<InputType, OutputType>({
    mutationKey: ['signIn'],
    mutationFn: async (body: InputType) => {
      const response = await api.post<OutputType>({
        url: `${BASE_URL}/sign-in`,
        options: {
          body: JSON.stringify(body),
        },
      });

      if (!response.data) {
        throw new Error('No data returned from sign-in');
      }

      return response.data;
    },
  });
}
