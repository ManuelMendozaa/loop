import { api } from '@/src/libs/api';
import { User, UserSchema } from '../types';

export async function useGetUser(id: string): Promise<User> {
  const { data, response } = await api.get<User>({
    url: `/users/${id}`,
    schema: UserSchema,
  });

  if (!response.ok || !data) {
    throw new Error('Failed to fetch user');
  }

  return data;
}
