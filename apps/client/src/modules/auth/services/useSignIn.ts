import { api, FetchOutput, useMutation } from '@/src/libs/api';
import { BASE_URL } from './const';
import { User } from '../../users/types';

type InputType = { email: string; password: string };
type OutputType = FetchOutput<{ user: User; token: string }>;

export function useSignIn() {
  return useMutation<InputType, OutputType>({
    mutationKey: ['signIn'],
    mutationFn: async (body: InputType) => {
      return api.post({
        url: `${BASE_URL}/sign-in`,
        options: {
          body: JSON.stringify(body),
        },
      });
    },
  });
}
