import { useAPIClient } from '@/hooks/useAPIClient';
import type { User } from '@repo/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ─── Query keys ───────────────────────────────────────────────────────────────

export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Fetch all users */
export const useUsers = () => {
  const apiClient = useAPIClient();

  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => apiClient.user.filter(),
  });
};

/** Fetch a single user by ID */
export const useUser = (id: string) => {
  const apiClient = useAPIClient();

  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => apiClient.user.get(id),
    enabled: Boolean(id),
  });
};

/** Create a user, then invalidate the list */
export const useCreateUser = () => {
  const apiClient = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<User, 'id'>) => apiClient.user.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

/** Update a user, then invalidate both list and detail */
export const useUpdateUser = (id: string) => {
  const apiClient = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Omit<User, 'id'>>) => apiClient.user.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
    },
  });
};

/** Delete a user, then invalidate the list */
export const useDeleteUser = () => {
  const apiClient = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.user.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
