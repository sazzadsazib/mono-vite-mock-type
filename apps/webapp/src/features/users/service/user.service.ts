import type { User } from '@repo/types';
import type { AxiosInstance } from 'axios';

// JSONPlaceholder user shape (subset we care about)
interface JPUser {
  id: number;
  name: string;
  email: string;
}

const toUser = (u: JPUser): User => ({
  id: String(u.id),
  name: u.name,
  email: u.email,
});

export const userService = (client: AxiosInstance) => ({
  filter: async (): Promise<User[]> => {
    const { data } = await client.get<JPUser[]>('/users');
    return data.map(toUser);
  },

  get: async (id: string): Promise<User> => {
    const { data } = await client.get<JPUser>(`/users/${id}`);
    return toUser(data);
  },

  create: async (payload: Omit<User, 'id'>): Promise<User> => {
    const { data } = await client.post<JPUser>('/users', payload);
    return toUser(data);
  },

  update: async (id: string, payload: Partial<Omit<User, 'id'>>): Promise<User> => {
    const { data } = await client.patch<JPUser>(`/users/${id}`, payload);
    return toUser(data);
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/users/${id}`);
  },
});
