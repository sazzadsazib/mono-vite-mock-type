import { userService } from '@/features/users/service/user.service';
import axiosInstance from '@/lib/axios';
import { useMemo } from 'react';

/**
 * Hook that returns a fully-typed API client.
 *
 * Usage:
 *   const apiClient = useAPIClient();
 *   const user = await apiClient.getUser('123');
 */
export const useAPIClient = () => {
  return useMemo(
    () => ({
      user: userService(axiosInstance),
      // add more services here as you grow:
      // ...productService(axiosInstance),
      // ...authService(axiosInstance),
    }),
    [],
  );
};
