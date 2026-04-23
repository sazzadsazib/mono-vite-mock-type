import axiosInstance from '@/lib/axios';
import type { User } from '@repo/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from './user.service';

const user = userService(axiosInstance);

// ─── Query keys ───────────────────────────────────────────────────────────────

export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Fetch all users */
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => user.list(),
  });
};

/** Fetch a single user by ID */
export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => user.get(id),
    enabled: Boolean(id),
  });
};

/** Create a user, then invalidate the list */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<User, 'id'>) => user.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

/** Update a user, then invalidate both list and detail */
export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Omit<User, 'id'>>) => user.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
    },
  });
};

/** Delete a user, then invalidate the list */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => user.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
