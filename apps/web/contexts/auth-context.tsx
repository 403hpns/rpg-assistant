'use client';
import { createContext, useState, useEffect, PropsWithChildren } from 'react';
import apiClient from '@/lib/axios';
import { usePathname } from 'next/navigation';

type User = {
  userId: number;
  name: string;
  email: string;
  onboarding?: boolean;
};

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await apiClient.get('/api/v1/auth/me', {
          withCredentials: true,
        });

        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (path.startsWith('/dashboard')) {
      fetchUser();
    }
  }, []);

  const login = async (name: string, password: string) => {
    const { data } = await apiClient.post(
      '/api/v1/auth/login',
      { name, password },
      { withCredentials: true }
    );
    setUser(data.user);
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
