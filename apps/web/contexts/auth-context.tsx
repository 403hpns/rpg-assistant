'use client';

import { createContext, PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import apiClient from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type User = {
  userId: number;
  name: string;
  email: string;
};

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const path = usePathname();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/v1/auth/me');
      return data;
    },
    enabled: path.startsWith('/dashboard'),
  });

  const login = async (name: string, password: string) => {
    await apiClient.post(
      '/api/v1/auth/login',
      { name, password },
      { withCredentials: true }
    );
  };

  const logout = () => {};

  const contextValue = {
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
