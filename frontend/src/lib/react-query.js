import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: true,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  },
  mutations: {
    useErrorBoundary: true,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export const getPromiseValue = promise =>
  promise && typeof promise.then === 'function'
    ? promise.then(res => res)
    : promise;

export const getErrorMessage = error => {
  if (error?.custom) {
    return error.message;
  }

  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.message ||
      'Unknown Axios Error'
    );
  }

  return 'Unknown Error';
};

export const createQueryConfig = config => {
  return {
    enabled: true,
    ...config,
  };
};

export const createMutationConfig = config => {
  return {
    ...config,
  };
};
