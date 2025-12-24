import { useMutation } from '@tanstack/react-query';
import { logoutApi } from './auth.api';

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
  });
};