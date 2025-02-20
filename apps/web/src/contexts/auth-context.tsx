import apiClient from '@/lib/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, createContext } from 'react';

type User = {
  userId: number;
  name: string;
  email: string;
  avatar: string;
  onboarding: boolean;
};

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
  ensureUserLoaded: () => Promise<User | null>;
};

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get('/api/v1/auth/me', {
          withCredentials: true,
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const ensureUserLoaded = async () => {
    try {
      const data = await queryClient.fetchQuery({
        queryKey: ['user'],
        queryFn: async () => {
          const { data } = await apiClient.get('/api/v1/auth/me');
          return data;
        },
        staleTime: 0,
        gcTime: 0,
      });
      return data;
    } catch (error) {
      queryClient.setQueryData(['user'], null);
      return null;
    }
  };

  const login = async (name: string, password: string) => {
    await apiClient.post(
      '/api/v1/auth/login',
      { name, password },
      {
        withCredentials: true,
      }
    );
    // await queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  const logout = async () => {
    await apiClient.post(
      '/api/v1/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );

    queryClient.setQueryData(['user'], null);
    queryClient.removeQueries();
  };

  const contextValue = {
    user: user ?? null,
    isLoading,
    login,
    logout,
    ensureUserLoaded,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
