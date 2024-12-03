"use client";

import React, { createContext, useState, useEffect } from "react";
import apiClient from "@/lib/axios";

type User = {
  id: number;
  name: string;
  email: string;
};

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await apiClient.get("/api/v1/auth/me", {
          withCredentials: true,
        });

        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (name: string, password: string) => {
    const { data } = await apiClient.post(
      "/api/v1/auth/login",
      { name, password },
      { withCredentials: true }
    );
    setUser(data.user);
  };

  const logout = async () => {
    await apiClient.post("/api/v1/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
